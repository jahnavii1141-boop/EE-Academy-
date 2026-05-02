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
function getTierFromPriceId(priceId) {
  if (priceId === process.env.NEXT_PUBLIC_PADDLE_PREMIUM_PRICE_ID) return 'premium'
  if (priceId === process.env.NEXT_PUBLIC_PADDLE_BASIC_PRICE_ID) return 'basic'
  return null
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
    console.error('Paddle webhook: no clerk_user_id in custom_data', transaction?.id)
    return Response.json({ error: 'No user ID' }, { status: 400 })
  }

  // Get the price ID from the first line item
  const priceId = transaction?.items?.[0]?.price?.id
  const tier = getTierFromPriceId(priceId)

  if (!tier) {
    console.error('Paddle webhook: unknown price ID', priceId)
    return Response.json({ error: 'Unknown price' }, { status: 400 })
  }

  const supabase = createServiceClient()

  // Upsert — create row if user never opened dashboard, or update existing
  const { error } = await supabase
    .from('user_workspace')
    .upsert({
      clerk_user_id: clerkUserId,
      has_paid: true,
      tier,
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })

  if (error) {
    console.error('Paddle webhook: Supabase error', error)
    return Response.json({ error: error.message }, { status: 500 })
  }

  console.log(`Paddle webhook: granted ${tier} to ${clerkUserId}`)
  return Response.json({ success: true })
}
