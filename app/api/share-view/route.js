import { createServiceClient } from '../../../src/lib/supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) return Response.json({ error: 'token required' }, { status: 400 })

  const supabase = createServiceClient()

  // Resolve token → user
  const { data: tokenRow, error: tokenError } = await supabase
    .from('share_tokens')
    .select('clerk_user_id')
    .eq('token', token)
    .single()

  if (tokenError || !tokenRow) {
    return Response.json({ error: 'Invalid or expired link' }, { status: 404 })
  }

  const userId = tokenRow.clerk_user_id

  // Fetch all public data for this user
  const [workspaceRes, dumpRes, plannerRes] = await Promise.all([
    supabase.from('user_workspace').select('research_question, subject, supervisor_name, submission_deadline, essay_text, essay_updated_at').eq('clerk_user_id', userId).single(),
    supabase.from('dump_entries').select('*').eq('clerk_user_id', userId).order('sort_order', { ascending: true }),
    supabase.from('planner_milestones').select('*').eq('clerk_user_id', userId).order('sort_order', { ascending: true }),
  ])

  return Response.json({
    workspace: workspaceRes.data ?? null,
    dump: dumpRes.data ?? [],
    planner: plannerRes.data ?? [],
  })
}
