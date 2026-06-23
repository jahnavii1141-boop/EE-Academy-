import { createServiceClient } from '../../../src/lib/supabase'
import { serverError } from '@/lib/apiError'
import { maskEmail } from '@/lib/security'

// Paddle sends webhook events for payment completions.
// We verify the signature, then flip has_paid=true and store the tier.
// Docs: https://developer.paddle.com/webhooks/signature-verification

// Constant-time hex string comparison — avoids leaking timing information.
function timingSafeEqualHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return mismatch === 0
}

// Returns: 'valid' | 'invalid' | 'misconfigured'
// 'misconfigured' = no signing secret set → we FAIL CLOSED (never accept unsigned webhooks).
async function verifyPaddleSignature(request, rawBody) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET
  if (!secret) return 'misconfigured'

  const signatureHeader = request.headers.get('paddle-signature')
  if (!signatureHeader) return 'invalid'

  // Parse ts and h1 from header: "ts=1234567890;h1=abc123..."
  const parts = Object.fromEntries(
    signatureHeader.split(';').map(p => p.split('='))
  )
  const { ts, h1 } = parts
  if (!ts || !h1) return 'invalid'

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

  return timingSafeEqualHex(computed, h1) ? 'valid' : 'invalid'
}

// Map Paddle price IDs to tiers
// Falls back to 'method' (basic access) if price ID is unknown — never silently fail a real payment
function getTierFromPriceId(priceId) {
  const premiumId = process.env.NEXT_PUBLIC_PADDLE_PREMIUM_PRICE_ID
  const basicId   = process.env.NEXT_PUBLIC_PADDLE_BASIC_PRICE_ID
  const mentorId  = process.env.NEXT_PUBLIC_PADDLE_MENTOR_PRICE_ID

  if (mentorId  && priceId === mentorId)  return 'premium'
  if (premiumId && priceId === premiumId) return 'premium'
  if (basicId   && priceId === basicId)   return 'basic'

  console.warn(`Paddle webhook: unrecognised price ID "${priceId}" — granting basic tier. Set env vars to fix.`)
  return 'basic'
}

export async function POST(request) {
  const rawBody = await request.text()
  console.log('[paddle-webhook] received')

  const sigResult = await verifyPaddleSignature(request, rawBody)
  if (sigResult === 'misconfigured') {
    // Fail closed: without a signing secret we cannot trust ANY webhook. Never grant access.
    console.error('[paddle-webhook] PADDLE_WEBHOOK_SECRET not set — refusing unsigned webhook (fail closed)')
    return Response.json({ error: 'Webhook not configured' }, { status: 500 })
  }
  if (sigResult !== 'valid') {
    console.error('[paddle-webhook] signature verification failed')
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }
  console.log('[paddle-webhook] signature verified')

  let event
  try {
    event = JSON.parse(rawBody)
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Only process completed transactions
  if (event.event_type !== 'transaction.completed') {
    console.log(`[paddle-webhook] ignoring event_type=${event.event_type}`)
    return Response.json({ received: true })
  }

  const transaction = event.data
  const customData = transaction?.custom_data || {}
  const clerkUserId = customData.clerk_user_id

  if (!clerkUserId) {
    // Log the full transaction so we can manually grant access if needed
    console.error('[paddle-webhook] no clerk_user_id in custom_data. Transaction ID:', transaction?.id, '| Customer email:', maskEmail(transaction?.customer?.email))
    // Still return 200 so Paddle doesn't keep retrying — we'll handle manually
    return Response.json({ received: true, warning: 'No user ID — manual grant needed' })
  }

  // Get the price ID from the first line item
  const priceId = transaction?.items?.[0]?.price?.id
  const tier = getTierFromPriceId(priceId)

  const supabase = createServiceClient()

  // ── Idempotency ──────────────────────────────────────────────────────────────
  // Duplicate webhook deliveries are expected. The has_paid flip is naturally
  // idempotent, but we also avoid moving paid_at on redelivery so the original
  // purchase timestamp is preserved.
  const { data: existing } = await supabase
    .from('user_workspace')
    .select('has_paid, paid_at')
    .eq('clerk_user_id', clerkUserId)
    .maybeSingle()

  const alreadyPaid = existing?.has_paid === true

  // Step 1: commit access (no tier — cannot be blocked by schema constraints).
  // Only set paid_at if this is the first time we're granting.
  const entitlement = {
    clerk_user_id: clerkUserId,
    has_paid: true,
    updated_at: new Date().toISOString(),
  }
  if (!alreadyPaid) entitlement.paid_at = new Date().toISOString()

  const { error } = await supabase
    .from('user_workspace')
    .upsert(entitlement, { onConflict: 'clerk_user_id' })

  if (error) {
    console.error('[paddle-webhook] Supabase error', error)
    return serverError('paddle-webhook', error)
  }

  // Step 2: set tier (best-effort — access is already granted above)
  await supabase
    .from('user_workspace')
    .update({ tier, updated_at: new Date().toISOString() })
    .eq('clerk_user_id', clerkUserId)

  if (alreadyPaid) {
    console.log(`[paddle-webhook] entitlement already granted for ${clerkUserId} — idempotent no-op (tier=${tier})`)
  } else {
    console.log(`[paddle-webhook] entitlement written: granted ${tier} to ${clerkUserId}`)
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
    console.log('[paddle-webhook] marketing sequence stopped for buyer')
  }

  return Response.json({ success: true })
}
