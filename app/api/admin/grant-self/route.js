import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../../src/lib/supabase'

// GET /api/admin/grant-self
// Open this URL in the browser while logged in as admin — instantly grants premium.
// Only works if your clerk_user_id is in ADMIN_CLERK_USER_IDS env var.

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Not logged in' }, { status: 401 })

  const adminIds = (process.env.ADMIN_CLERK_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean)
  if (!adminIds.includes(userId)) {
    return Response.json({ error: 'Your user ID is not in ADMIN_CLERK_USER_IDS' }, { status: 403 })
  }

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

  return Response.json({ success: true, message: 'Premium granted. Go to /dashboard and refresh.' })
}
