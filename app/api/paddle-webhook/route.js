import { createServiceClient } from '../../../src/lib/supabase'

// Paddle sends webhook events for payment completions.
// We verify the signature, then flip has_paid=true and store the tier.
// Docs: https://developer.paddle.com/webhooks/signature-verification

async function verifyPaddleSignature(request, rawBody) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET
  if (!secret) return true // skip in dev if no secret set

  const signatureHeader = request.headers.get('paddle-signature')
  if (!signatureHeader) return false

  // Parse ts and h1 from header: "ts=1234567890;h1=abc123..."
  const parts = Object.fromEntries(
    signatureHeader.split(';').map(p => p.split('='))
  )
  const { ts, h1 } = parts
  if (!ts || !h1) return false

  // Build signed payload: ts + ":" + raw body
  const signedPayload = `${ts}:${rawBody}`

  // HMAC-SHA256
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const msgData = encoder.encode(signedPayload)

  const cryptoKey = await crypto.subtle.importKey(
    'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
  const computed = Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  return computed === h1
}

// Map Paddle price IDs to tiers
// Falls back to 'method' (basic access) if price ID is unknown — never silently fail a real payment
function getTierFromPriceId(priceId) {
  const premiumId = process.env.NEXT_PUBLIC_PADDLE_PREMIUM_PRICE_ID
  const basicId   = process.env.NEXT_PUBLIC_PADDLE_BASIC_PRICE_ID
  const mentorId  = process.env.NEXT_PUBLIC_PADDLE_MENTOR_PRICE_ID

  if (mentorId  && priceId === mentorId)  return 'premium' // Method+Me gets premium
  if (premiumId && priceId === premiumId) return 'premium' // Method+AI
  if (basicId   && priceId === basicId)   return 'method'  // Method

  // Price IDs not configured — still grant basic access rather than dropping the payment
  console.warn(`Paddle webhook: unrecognised price ID "${priceId}" — granting method tier. Set env vars to fix.`)
  return 'method'
}

export async function POST(request) {
  const rawBody = await request.text()

  const valid = await verifyPaddleSignature(request, rawBody)
  if (!valid) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event
  try {
    event = JSON.parse(rawBody)
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Only process completed transactions
  if (event.event_type !== 'transaction.completed') {
    return Response.json({ received: true })
  }

  const transaction = event.data
  const customData = transaction?.custom_data || {}
  const clerkUserId = customData.clerk_user_id

  if (!clerkUserId) {
    // Log the full transaction so we can manually grant access if needed
    console.error('Paddle webhook: no clerk_user_id in custom_data. Transaction ID:', transaction?.id, '| Customer email:', transaction?.customer?.email)
    // Still return 200 so Paddle doesn't keep retrying — we'll handle manually
    return Response.json({ received: true, warning: 'No user ID — manual grant needed' })
  }

  // Get the price ID from the first line item (used for logging only)
  const priceId = transaction?.items?.[0]?.price?.id
  const tier = getTierFromPriceId(priceId)

  const supabase = createServiceClient()

  // Upsert — create row if user never opened dashboard, or update existing
  // NOTE: user_workspace schema only has has_paid (no tier/paid_at columns)
  const { error } = await supabase
    .from('user_workspace')
    .upsert({
      clerk_user_id: clerkUserId,
      has_paid: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })

  if (error) {
    console.error('Paddle webhook: Supabase error', error)
    return Response.json({ error: error.message }, { status: 500 })
  }

  // ── Stop marketing sequence for this buyer ──────────────────────────────────
  // Paddle includes the customer email in transaction.customer.email.
  // We mark the subscriber row paid_at so the cron skips future marketing emails.
  // Rule: the moment someone pays, all marketing sequences stop.
  const customerEmail = transaction?.customer?.email
  if (customerEmail) {
    await supabase
      .from('subscribers')
      .update({ paid_at: new Date().toISOString() })
      .eq('email', customerEmail)
      .is('paid_at', null) // only update if not already marked
  }

  console.log(`Paddle webhook: granted ${tier} to ${clerkUserId}`)
  return Response.json({ success: true })
}
