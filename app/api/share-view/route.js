import { createServiceClient } from '../../../src/lib/supabase'

// Public endpoint — no auth required (supervisor visits without an account).
// Token is stored in user_workspace.share_token — no separate table needed.

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) return Response.json({ error: 'token required' }, { status: 400 })

  const supabase = createServiceClient()

  // Resolve token → user workspace row in one query
  const { data: workspace, error: wsError } = await supabase
    .from('user_workspace')
    .select('*')
    .eq('share_token', token)
    .single()

  if (wsError || !workspace) {
    return Response.json({ error: 'Invalid or expired link' }, { status: 404 })
  }

  const userId = workspace.clerk_user_id

  // Fetch citations and planner in parallel
  const [dumpRes, plannerRes] = await Promise.all([
    supabase.from('dump_entries').select('*').eq('clerk_user_id', userId).order('sort_order', { ascending: true }),
    supabase.from('planner_milestones').select('*').eq('clerk_user_id', userId).order('sort_order', { ascending: true }),
  ])

  return Response.json({
    workspace,
    dump: dumpRes.data ?? [],
    planner: plannerRes.data ?? [],
  })
}
