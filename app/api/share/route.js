import { auth } from '@clerk/nextjs/server'
import { serverError } from '@/lib/apiError'
import { createServiceClient } from '../../../src/lib/supabase'
import { randomBytes } from 'crypto'

// Share token is stored directly in user_workspace.share_token
// No separate share_tokens table needed.

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('user_workspace')
    .select('share_token')
    .eq('clerk_user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    return serverError('share', error)
  }

  return Response.json({ token: data?.share_token ?? null })
}

export async function POST() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()

  // Check if token already exists
  const { data: existing } = await supabase
    .from('user_workspace')
    .select('share_token')
    .eq('clerk_user_id', userId)
    .single()

  if (existing?.share_token) {
    return Response.json({ token: existing.share_token })
  }

  const token = randomBytes(16).toString('hex')
  const { error } = await supabase
    .from('user_workspace')
    .upsert({
      clerk_user_id: userId,
      share_token: token,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })

  if (error) return serverError('share', error)
  return Response.json({ token })
}

export async function DELETE() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()
  await supabase
    .from('user_workspace')
    .update({ share_token: null, updated_at: new Date().toISOString() })
    .eq('clerk_user_id', userId)

  return Response.json({ success: true })
}
