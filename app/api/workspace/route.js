import { auth } from '@clerk/nextjs/server'
import { serverError } from '@/lib/apiError'
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
    return serverError('workspace', error)
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

// Columns the client is allowed to write. NEVER include billing/privilege
// columns (has_paid, tier, paid_at, share_token, agent_free_uses, clerk_user_id).
const PATCHABLE_FIELDS = [
  'research_question', 'subject', 'supervisor_name', 'submission_deadline',
  'supervisor_remarks', 'supervisor_remarks_at', 'essay_text', 'essay_updated_at',
]

export async function PATCH(request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  // Whitelist incoming fields. Spreading the raw body let a signed-in user
  // set has_paid/tier and grant themselves paid access (mass assignment).
  const patch = { updated_at: new Date().toISOString() }
  for (const key of PATCHABLE_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, key)) patch[key] = body[key]
  }

  const supabase = createServiceClient()
  const { error } = await supabase
    .from('user_workspace')
    .update(patch)
    .eq('clerk_user_id', userId)

  if (error) {
    console.error('[workspace] PATCH error', error)
    return Response.json({ error: 'Could not save changes' }, { status: 500 })
  }
  return Response.json({ success: true })
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

  if (error) return serverError('workspace', error)
  return Response.json({ workspace: data })
}
