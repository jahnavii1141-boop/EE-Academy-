import { auth } from '@clerk/nextjs/server'
import { serverError } from '@/lib/apiError'
import { createServiceClient } from '../../../src/lib/supabase'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('planner_milestones')
    .select('*')
    .eq('clerk_user_id', userId)
    .order('sort_order', { ascending: true })

  if (error) return serverError('planner', error)
  return Response.json({ milestones: data || [] })
}

export async function POST(request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const supabase = createServiceClient()

  await supabase.from('planner_milestones').delete().eq('clerk_user_id', userId)

  if (body.milestones && body.milestones.length > 0) {
    const rows = body.milestones.map((m, i) => ({
      clerk_user_id: userId,
      label: m.label,
      phase: m.phase,
      weeks_before: m.weeks_before ?? null,
      completed: m.completed ?? false,
      due_date: m.due_date ?? null,
      is_custom: m.is_custom ?? false,
      sort_order: i,
    }))

    const { error } = await supabase.from('planner_milestones').insert(rows)
    if (error) return serverError('planner', error)
  }

  return Response.json({ success: true })
}
