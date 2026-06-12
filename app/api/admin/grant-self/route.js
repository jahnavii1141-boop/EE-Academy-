import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../../src/lib/supabase'

export async function POST(req) { return handler(req) }
export async function GET(req) { return handler(req) }

async function handler(req) {
  try {
    const { userId } = await auth()
    if (!userId) return Response.json({ error: 'Not signed in — log in first' }, { status: 401 })

    // Require admin key so random users can't grant themselves access
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')
    const adminKey = process.env.ADMIN_GRANT_KEY
    if (!adminKey || key !== adminKey) {
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    }

    const tier = searchParams.get('tier') || 'method'

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

    if (error) return Response.json({ error: error.message }, { status: 500 })

    return Response.json({ success: true, userId, tier, message: `✓ ${tier} access granted — hard-refresh the course page.` })
  } catch (e) {
    return Response.json({ error: e?.message || String(e) }, { status: 500 })
  }
}
