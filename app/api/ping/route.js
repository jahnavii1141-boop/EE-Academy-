import { createServiceClient } from '../../../src/lib/supabase'

// Cron endpoint — runs daily to prevent Supabase free tier from pausing.
// Supabase pauses projects after 7 days of inactivity on the free plan.
export async function GET() {
  try {
    const supabase = createServiceClient()
    // Lightweight query — just checks the connection
    await supabase.from('user_workspace').select('clerk_user_id').limit(1)
    return Response.json({ ok: true, ts: new Date().toISOString() })
  } catch (e) {
    return Response.json({ ok: false, error: e.message }, { status: 500 })
  }
}
