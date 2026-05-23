import { auth } from '@clerk/nextjs/server'

// GET /api/admin/whoami
// Returns your Clerk user ID and what's stored in ADMIN_CLERK_USER_IDS
// Use this to debug why grant-self isn't working

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Not logged in' }, { status: 401 })

  const adminIds = (process.env.ADMIN_CLERK_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean)

  return Response.json({
    your_user_id: userId,
    admin_ids_configured: adminIds,
    is_admin: adminIds.includes(userId),
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
    supabase_service_key_set: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  })
}
