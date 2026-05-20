import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../../src/lib/supabase'

// GET /api/admin/grant-self
// Visit this URL while signed in — grants you premium instantly.

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Not signed in — log in first' }, { status: 401 })

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

  return Response.json({ success: true, message: '✓ Premium granted! Hard-refresh your dashboard.' })
}
