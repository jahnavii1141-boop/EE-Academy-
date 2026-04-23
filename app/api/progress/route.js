import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../src/lib/supabase'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('module_progress')
    .select('module_id')
    .eq('clerk_user_id', userId)

  if (error) return Response.json({ error: error.message }, { status: 500 })

  const progress = {}
  ;(data || []).forEach(row => { progress[row.module_id] = true })
  return Response.json({ progress })
}

export async function POST(request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { module_id } = await request.json()
  if (!module_id) return Response.json({ error: 'module_id required' }, { status: 400 })

  const supabase = createServiceClient()
  const { error } = await supabase
    .from('module_progress')
    .upsert({ clerk_user_id: userId, module_id }, { onConflict: 'clerk_user_id,module_id' })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
