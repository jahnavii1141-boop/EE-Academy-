import { createServiceClient } from '../../../src/lib/supabase'

// Public endpoint — no auth required (supervisor doesn't have an account).
// Validates the share token, then saves remarks to user_workspace.

export async function POST(request) {
  try {
    const { token, remarks, supervisor_name } = await request.json()

    if (!token) return Response.json({ error: 'token required' }, { status: 400 })
    if (!remarks || !remarks.trim()) return Response.json({ error: 'remarks required' }, { status: 400 })
    if (remarks.trim().length > 2000) return Response.json({ error: 'Remarks must be under 2,000 characters' }, { status: 400 })

    const supabase = createServiceClient()

    // Validate token → find the workspace row
    const { data: workspace, error: wsError } = await supabase
      .from('user_workspace')
      .select('clerk_user_id')
      .eq('share_token', token)
      .single()

    if (wsError || !workspace) {
      return Response.json({ error: 'Invalid or expired link' }, { status: 404 })
    }

    // Save remarks
    const { error: updateError } = await supabase
      .from('user_workspace')
      .update({
        supervisor_remarks: remarks.trim(),
        supervisor_name: supervisor_name?.trim() || null,
        supervisor_remarks_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('clerk_user_id', workspace.clerk_user_id)

    if (updateError) {
      console.error('share-remarks update error:', updateError)
      return Response.json({ error: updateError.message }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('share-remarks error:', err)
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
