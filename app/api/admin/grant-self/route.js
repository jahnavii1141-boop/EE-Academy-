import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../../src/lib/supabase'

export async function POST(req) { return handler(req) }
export async function GET(req) { return handler(req) }

async function handler() {
  try {
    const { userId } = await auth()
    if (!userId) return Response.json({ error: 'Not signed in — log in first' }, { status: 401 })

    const supabase = createServiceClient()
    const { error } = await supabase
      .from('user_workspace')
      .upsert({
        clerk_user_id: userId,
        has_paid: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'clerk_user_id' })

    if (error) return Response.json({ error: error.message }, { status: 500 })

    return Response.json({ success: true, message: '✓ Premium granted! Hard-refresh your dashboard.' })
  } catch (e) {
    return Response.json({ error: e?.message || String(e) }, { status: 500 })
  }
}
