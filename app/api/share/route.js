import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../src/lib/supabase'
import { randomBytes } from 'crypto'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('share_tokens')
    .select('token, created_at')
    .eq('clerk_user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ token: data?.token ?? null })
}

export async function POST() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()

  // Check if token already exists
  const { data: existing } = await supabase
    .from('share_tokens')
    .select('token')
    .eq('clerk_user_id', userId)
    .single()

  if (existing?.token) {
    return Response.json({ token: existing.token })
  }

  const token = randomBytes(16).toString('hex')
  const { error } = await supabase
    .from('share_tokens')
    .insert({ clerk_user_id: userId, token })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ token })
}

export async function DELETE() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()
  await supabase.from('share_tokens').delete().eq('clerk_user_id', userId)
  return Response.json({ success: true })
}
