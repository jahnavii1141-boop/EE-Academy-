import { Webhook } from 'svix'
import { createServiceClient } from '../../../../src/lib/supabase'

const FROM = 'Gia from EE Academy <hello@theextendedessay.com>'

function welcomeHtml(email) {
  const unsub = `https://theextendedessay.com/unsubscribe?email=${encodeURIComponent(email)}`
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#0a0a0a">
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">Hey,</p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        Welcome to the EE Academy. I'm Gia — I scored 32/34 on my Extended Essay and built this
        so you don't have to figure it out the hard way like I did.
      </p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        You've got access to Modules 1, 2, 3, and 5 — covering the mindset, IB criteria,
        subject selection, topic choice, and the research system I used. Start here:
      </p>
      <a href="https://theextendedessay.com/course/module-1"
        style="display:inline-block;background:#0a0a0a;color:#fff;text-decoration:none;
               padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;margin-bottom:28px">
        Start Module 1 →
      </a>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        If you have a question about your EE at any point — research question, subject choice,
        structure — just reply to this email. I read everything.
      </p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 4px">Gia</p>
      <p style="font-size:13px;color:#888;margin:0">32/34 · EE Academy</p>
      <hr style="border:none;border-top:1px solid #f0f0f0;margin:32px 0 16px"/>
      <p style="font-size:11px;color:#bbb;margin:0">
        You're receiving this because you signed up at theextendedessay.com. ·
        <a href="${unsub}" style="color:#bbb">Unsubscribe</a>
      </p>
    </div>`
}

export async function POST(req) {
  // ── Verify signature ───────────────────────────────────────────────────────
  const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET
  if (!secret) {
    console.error('[clerk-webhook] CLERK_WEBHOOK_SIGNING_SECRET is not set')
    return Response.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const svixId        = req.headers.get('svix-id')
  const svixTimestamp = req.headers.get('svix-timestamp')
  const svixSignature = req.headers.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return Response.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  const body = await req.text()

  let event
  try {
    const wh = new Webhook(secret)
    event = wh.verify(body, {
      'svix-id':        svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    })
  } catch (err) {
    console.error('[clerk-webhook] Signature verification failed:', err.message)
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // ── Only handle user.created ───────────────────────────────────────────────
  if (event.type !== 'user.created') {
    return Response.json({ received: true })
  }

  const userId = event.data.id
  const emailObj = (event.data.email_addresses ?? []).find(
    e => e.id === event.data.primary_email_address_id
  )
  const email = emailObj?.email_address

  if (!email) {
    console.warn(`[clerk-webhook] user.created (${userId}): no primary email, skipping`)
    return Response.json({ received: true })
  }

  // ── Idempotency: skip if already sent ────────────────────────────────────
  const supabase = createServiceClient()
  const { data: existing } = await supabase
    .from('subscribers')
    .select('id, email_1_sent_at')
    .eq('email', email)
    .single()

  if (existing?.email_1_sent_at) {
    console.log(`[clerk-webhook] user.created (${userId}): welcome already sent to ${email}, skipping`)
    return Response.json({ received: true, skipped: true })
  }

  // ── Send welcome email ────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error(`[clerk-webhook] user.created (${userId}): RESEND_API_KEY not set`)
    return Response.json({ error: 'Email service not configured' }, { status: 500 })
  }

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from:    FROM,
      to:      [email],
      subject: 'Welcome to EE Academy — start here',
      html:    welcomeHtml(email),
    }),
  })

  if (!emailRes.ok) {
    const errBody = await emailRes.json().catch(() => ({}))
    console.error(`[clerk-webhook] user.created (${userId}): Resend error ${emailRes.status}:`, errBody)
    // Return non-2xx so Clerk retries the webhook delivery
    return Response.json({ error: 'Welcome email failed' }, { status: 500 })
  }

  // ── Record the send (prevents double-send on webhook retries) ─────────────
  const now = new Date().toISOString()
  if (existing) {
    // Row exists but email_1_sent_at was null — update it
    await supabase
      .from('subscribers')
      .update({ email_1_sent_at: now })
      .eq('email', email)
  } else {
    // New subscriber via Clerk signup — insert row
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert({ email, source: 'clerk-webhook', subscribed_at: now, email_1_sent_at: now })

    if (insertError?.code === '23505') {
      // Race: subscribe route inserted between our SELECT and this INSERT — just update
      await supabase
        .from('subscribers')
        .update({ email_1_sent_at: now })
        .eq('email', email)
        .is('email_1_sent_at', null)
    }
  }

  console.log(`[clerk-webhook] user.created (${userId}): welcome email sent to ${email}`)
  return Response.json({ received: true, sent: true })
}
