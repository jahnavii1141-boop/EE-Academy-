import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../../src/lib/supabase'

// GET /api/admin/grant-self?secret=<GRANT_SECRET>
// Visit in browser while signed in. Grants the signed-in user premium.
// Protected by GRANT_SECRET env var — set this to any random string on Vercel.
// Falls back to ADMIN_CLERK_USER_IDS check if secret not provided.

export async function GET(req) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Not signed in — log in first then visit this URL' }, { status: 401 })

  const url = new URL(req.url)
  const secret = url.searchParams.get('secret')

  // Method 1: secret token (preferred — works without any other config)
  const grantSecret = process.env.GRANT_SECRET
  if (grantSecret && secret === grantSecret) {
    return grantPremium(userId)
  }

  // Method 2: admin user IDs list
  const adminIds = (process.env.ADMIN_CLERK_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean)
  if (adminIds.includes(userId)) {
    return grantPremium(userId)
  }

  return Response.json({
    error: 'Access denied',
    hint: 'Add ?secret=YOUR_GRANT_SECRET to the URL, or add your user ID to ADMIN_CLERK_USER_IDS on Vercel',
    your_user_id: userId,
  }, { status: 403 })
}

export async function POST(req) { return GET(req) }

async function grantPremium(userId) {
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('user_workspace')
    .upsert({
      clerk_user_id: userId,
      has_paid: true,
      tier: 'premium',
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })

  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({
    success: true,
    user_id: userId,
    message: '✓ Premium granted. Hard-refresh your dashboard.',
  })
}
