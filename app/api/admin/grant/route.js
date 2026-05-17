import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../../src/lib/supabase'

// Admin-only endpoint to manually grant premium access.
// Usage: POST /api/admin/grant with { clerk_user_id, tier }
// Only works if the requester's user ID is in ADMIN_CLERK_USER_IDS env var.

export async function POST(request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  // Only admins can grant access
  const adminIds = (process.env.ADMIN_CLERK_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean)
  if (!adminIds.includes(userId)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { clerk_user_id, tier = 'premium' } = await request.json()
  if (!clerk_user_id) return Response.json({ error: 'clerk_user_id required' }, { status: 400 })

  const validTiers = ['method', 'premium']
  if (!validTiers.includes(tier)) return Response.json({ error: 'Invalid tier' }, { status: 400 })

  const supabase = createServiceClient()
  const { error } = await supabase
    .from('user_workspace')
    .upsert({
      clerk_user_id,
      has_paid: true,
      tier,
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })

  if (error) return Response.json({ error: error.message }, { status: 500 })

  console.log(`Admin grant: ${tier} → ${clerk_user_id} by ${userId}`)
  return Response.json({ success: true, granted: { clerk_user_id, tier } })
}
