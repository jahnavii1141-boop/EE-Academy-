import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../src/lib/supabase'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('user_workspace')
    .select('*')
    .eq('clerk_user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    return Response.json({ error: error.message }, { status: 500 })
  }

  // Admin override — founder always gets premium regardless of DB state
  const adminIds = (process.env.ADMIN_CLERK_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean)
  const workspace = data || null
  if (adminIds.includes(userId) && workspace) {
    workspace.has_paid = true
    workspace.tier = 'premium'
  }

  return Response.json({ workspace })
}

export async function POST(request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('user_workspace')
    .upsert({
      clerk_user_id: userId,
      research_question: body.research_question ?? '',
      subject: body.subject ?? '',
      supervisor_name: body.supervisor_name ?? '',
      submission_deadline: body.submission_deadline || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ workspace: data })
}
