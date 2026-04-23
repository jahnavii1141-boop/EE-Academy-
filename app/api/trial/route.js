import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../src/lib/supabase'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('user_workspace')
    .select('trial_started_at, has_paid')
    .eq('clerk_user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({
    trial_started_at: data?.trial_started_at ?? null,
    has_paid: data?.has_paid ?? false,
  })
}

export async function POST() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()

  // Only set trial_started_at if it doesn't already exist
  const { data: existing } = await supabase
    .from('user_workspace')
    .select('trial_started_at')
    .eq('clerk_user_id', userId)
    .single()

  if (existing?.trial_started_at) {
    return Response.json({ already_started: true })
  }

  const { error } = await supabase
    .from('user_workspace')
    .upsert({
      clerk_user_id: userId,
      trial_started_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
