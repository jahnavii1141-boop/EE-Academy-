import { auth } from '@clerk/nextjs/server'
import { serverError } from '@/lib/apiError'
import { createServiceClient } from '../../../src/lib/supabase'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('user_workspace')
    .select('essay_text, essay_updated_at')
    .eq('clerk_user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    return serverError('essay', error)
  }

  return Response.json({ essay_text: data?.essay_text ?? '', essay_updated_at: data?.essay_updated_at ?? null })
}

export async function POST(request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { essay_text } = await request.json()
  // Bound size — an EE is ~4,000 words; 500k chars is a very generous ceiling
  // that still blocks someone from stuffing megabytes into the row.
  if (typeof essay_text === 'string' && essay_text.length > 500000) {
    return Response.json({ error: 'Essay is too large to save.' }, { status: 413 })
  }
  const supabase = createServiceClient()

  const { error } = await supabase
    .from('user_workspace')
    .upsert({
      clerk_user_id: userId,
      essay_text: essay_text ?? '',
      essay_updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })

  if (error) return serverError('essay', error)
  return Response.json({ ok: true })
}
