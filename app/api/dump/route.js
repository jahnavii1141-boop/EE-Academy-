import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../src/lib/supabase'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('dump_entries')
    .select('*')
    .eq('clerk_user_id', userId)
    .order('sort_order', { ascending: true })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ entries: data || [] })
}

export async function POST(request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const supabase = createServiceClient()

  // Full replace — delete all and re-insert
  await supabase.from('dump_entries').delete().eq('clerk_user_id', userId)

  if (body.entries && body.entries.length > 0) {
    const rows = body.entries.map((e, i) => ({
      clerk_user_id: userId,
      source_name:    e.source_name    ?? '',
      author:         e.author         ?? '',
      year:           e.year           ?? '',
      publisher:      e.publisher      ?? '',
      link:           e.link           ?? e.url ?? '',
      source_type:    e.source_type    ?? 'Website',
      key_info:       e.key_info       ?? '',
      subtopic:       e.subtopic       ?? '',
      subtopic_color: e.subtopic_color ?? '#6366f1',
      used:           e.used           ?? false,
      sort_order:     i,
    }))

    const { error } = await supabase.from('dump_entries').insert(rows)
    if (error) return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ success: true })
}
