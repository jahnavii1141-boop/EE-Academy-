import { readFile } from 'fs/promises'
import path from 'path'
import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../src/lib/supabase'

export const dynamic = 'force-dynamic'

// Serves the full sample Extended Essay PDF — paid users only.
// Free users get the preview images on the page; the full file is gated here.
export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Sign in required' }, { status: 401 })

  // Admin override — founder always has access
  const adminIds = (process.env.ADMIN_CLERK_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean)
  let hasPaid = adminIds.includes(userId)

  if (!hasPaid) {
    const supabase = createServiceClient()
    const { data } = await supabase
      .from('user_workspace')
      .select('has_paid')
      .eq('clerk_user_id', userId)
      .single()
    hasPaid = data?.has_paid === true
  }

  if (!hasPaid) {
    return Response.json({ error: 'Upgrade required to access the full essay' }, { status: 403 })
  }

  const file = await readFile(path.join(process.cwd(), 'private', 'sample-ee.pdf'))
  return new Response(file, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Sample Extended Essay — ZARA (32-34).pdf"',
      'Cache-Control': 'private, no-store',
    },
  })
}
