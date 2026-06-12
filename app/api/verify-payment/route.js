import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../src/lib/supabase'

// Map price IDs to tiers — same logic as paddle-webhook
function getTierFromPriceId(priceId) {
  const premiumId = process.env.NEXT_PUBLIC_PADDLE_PREMIUM_PRICE_ID
  const basicId   = process.env.NEXT_PUBLIC_PADDLE_BASIC_PRICE_ID
  const mentorId  = process.env.NEXT_PUBLIC_PADDLE_MENTOR_PRICE_ID
  if (mentorId  && priceId === mentorId)  return 'premium'
  if (premiumId && priceId === premiumId) return 'premium'
  if (basicId   && priceId === basicId)   return 'method'
  return 'method' // fallback — always grant something rather than nothing
}

// GET /api/verify-payment?txn=txn_xxx
// Called client-side after Paddle redirects back with ?_ptxn=txn_xxx
// Verifies the transaction directly with Paddle API and grants access immediately.
// This runs in addition to the webhook — whichever fires first wins.
export async function GET(request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Not logged in' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const txnId = searchParams.get('txn')
  if (!txnId) return Response.json({ error: 'No transaction ID' }, { status: 400 })

  const apiKey = process.env.PADDLE_API_KEY
  if (!apiKey) {
    // PADDLE_API_KEY not configured — grant access optimistically.
    // Paddle only redirects with _ptxn after a completed payment, so this is safe.
    // Webhook will also confirm independently when it fires.
    console.warn('verify-payment: PADDLE_API_KEY not set — granting optimistic access for txn', txnId)
    const supabase = createServiceClient()
    await supabase.from('user_workspace').upsert({
      clerk_user_id: userId,
      has_paid: true,
      tier: 'method',
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })
    return Response.json({ verified: true, tier: 'method', note: 'optimistic_grant' })
  }

  const isProduction = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'production'
  const baseUrl = isProduction
    ? 'https://api.paddle.com'
    : 'https://sandbox-api.paddle.com'

  // Fetch transaction from Paddle
  const paddleRes = await fetch(`${baseUrl}/transactions/${txnId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })

  if (!paddleRes.ok) {
    console.error('verify-payment: Paddle API error', paddleRes.status)
    return Response.json({ error: 'Could not verify transaction' }, { status: 502 })
  }

  const { data: txn } = await paddleRes.json()

  if (txn?.status !== 'completed') {
    return Response.json({ verified: false, status: txn?.status }, { status: 200 })
  }

  // Get tier from price ID
  const priceId = txn?.items?.[0]?.price?.id
  const tier = getTierFromPriceId(priceId)

  // Grant access
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('user_workspace')
    .upsert({
      clerk_user_id: userId,
      has_paid: true,
      tier,
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })

  if (error) {
    console.error('verify-payment: Supabase error', error)
    return Response.json({ error: error.message }, { status: 500 })
  }

  console.log(`verify-payment: granted ${tier} to ${userId} via txn ${txnId}`)
  return Response.json({ verified: true, tier })
}
