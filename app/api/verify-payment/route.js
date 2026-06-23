import { auth } from '@clerk/nextjs/server'
import { serverError } from '@/lib/apiError'
import { createServiceClient } from '../../../src/lib/supabase'

// Map price IDs to tiers — same logic as paddle-webhook
function getTierFromPriceId(priceId) {
  const premiumId = process.env.NEXT_PUBLIC_PADDLE_PREMIUM_PRICE_ID
  const basicId   = process.env.NEXT_PUBLIC_PADDLE_BASIC_PRICE_ID
  const mentorId  = process.env.NEXT_PUBLIC_PADDLE_MENTOR_PRICE_ID
  if (mentorId  && priceId === mentorId)  return 'premium'
  if (premiumId && priceId === premiumId) return 'premium'
  if (basicId   && priceId === basicId)   return 'basic'
  return 'basic' // fallback — always grant something rather than nothing
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
    // Fail closed: never grant access without verifying the transaction with Paddle.
    // A _ptxn query param is attacker-controllable, so we must confirm it server-side.
    console.error('[verify-payment] PADDLE_API_KEY not set — cannot verify, refusing to grant (fail closed)')
    return Response.json({ error: 'Payment verification unavailable' }, { status: 500 })
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

  const PAID_STATUSES = ['completed', 'billed']
  if (!PAID_STATUSES.includes(txn?.status)) {
    console.error('[verify-payment] unexpected transaction status', txn?.status, 'for txn', txnId)
    return Response.json({ verified: false, status: txn?.status }, { status: 200 })
  }

  // Guard: if the transaction was created for a specific Clerk user, only that
  // user may redeem it. Stops user B from claiming user A's _ptxn link.
  const txnClerkId = txn?.custom_data?.clerk_user_id
  if (txnClerkId && txnClerkId !== userId) {
    console.error(`[verify-payment] txn ${txnId} belongs to ${txnClerkId}, not ${userId} — refusing`)
    return Response.json({ error: 'Transaction does not belong to this user' }, { status: 403 })
  }

  // Get tier from price ID
  const priceId = txn?.items?.[0]?.price?.id
  const tier = getTierFromPriceId(priceId)

  // Grant access — two separate writes so a tier constraint never blocks has_paid
  const supabase = createServiceClient()

  // Idempotency: preserve the original paid_at on repeat verifications
  const { data: existing } = await supabase
    .from('user_workspace')
    .select('has_paid')
    .eq('clerk_user_id', userId)
    .maybeSingle()
  const alreadyPaid = existing?.has_paid === true

  // Step 1: commit access (no tier — cannot be blocked by schema constraints)
  const entitlement = {
    clerk_user_id: userId,
    has_paid: true,
    updated_at: new Date().toISOString(),
  }
  if (!alreadyPaid) entitlement.paid_at = new Date().toISOString()

  const { error } = await supabase
    .from('user_workspace')
    .upsert(entitlement, { onConflict: 'clerk_user_id' })

  if (error) {
    console.error('[verify-payment] Supabase error', error)
    return serverError('verify-payment', error)
  }

  // Step 2: set tier (best-effort — access is already granted above)
  await supabase
    .from('user_workspace')
    .update({ tier, updated_at: new Date().toISOString() })
    .eq('clerk_user_id', userId)

  console.log(`[verify-payment] ${alreadyPaid ? 'already granted (idempotent)' : 'entitlement written'}: ${tier} to ${userId} via txn ${txnId}`)
  return Response.json({ verified: true, tier })
}
