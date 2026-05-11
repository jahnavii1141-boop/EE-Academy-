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

  return Response.json({ workspace: data || null })
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
