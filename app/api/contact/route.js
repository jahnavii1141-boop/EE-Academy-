// POST /api/contact
// Accepts { name, email, subject, message } from the contact form.
// 1. Sends notification email to hello@ so you see it immediately
// 2. Sends auto-reply to the student confirming 24-hour response SLA

const SUPPORT_EMAIL = 'hello@theextendedessay.com'
const FROM_SUPPORT = 'The Extended Essay Academy <hello@theextendedessay.com>'

// Escape user input before it is interpolated into email HTML. Without this,
// a submitted name/subject/message can inject arbitrary HTML into the emails.
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function notificationHtml({ name, email, subject, message }) {
  name = esc(name); email = esc(email); subject = esc(subject); message = esc(message)
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0a0a0a">
      <p style="font-size:13px;color:#888;margin:0 0 20px;text-transform:uppercase;letter-spacing:0.08em">
        New support message
      </p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px">
        <tr>
          <td style="padding:8px 12px;background:#f5f5f5;font-weight:600;width:80px;border-radius:4px 0 0 0">From</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0">${name} &lt;${email}&gt;</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Subject</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0">${subject || '(no subject)'}</td>
        </tr>
      </table>
      <div style="background:#fafafa;border-left:3px solid #0a0a0a;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px">
        <p style="font-size:15px;line-height:1.8;margin:0;white-space:pre-wrap">${message}</p>
      </div>
      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your EE Academy question')}"
        style="display:inline-block;background:#0a0a0a;color:#fff;text-decoration:none;
               padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600">
        Reply to ${name} →
      </a>
    </div>`
}

function autoReplyHtml({ name }) {
  name = esc(name)
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#0a0a0a">
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">Hey ${name},</p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        Got your message — we'll get back to you within <strong>24 hours</strong>.
      </p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        While you wait, the free modules are a good starting point if you haven't already:
      </p>
      <a href="https://theextendedessay.com/course/module-1"
        style="display:inline-block;background:#0a0a0a;color:#fff;text-decoration:none;
               padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;margin-bottom:28px">
        Start Module 1 →
      </a>
      <p style="font-size:15px;line-height:1.7;margin:0 0 4px">The Extended Essay Academy</p>
      <p style="font-size:13px;color:#888;margin:0">Built from a real 32/34 EE</p>
      <hr style="border:none;border-top:1px solid #f0f0f0;margin:32px 0 16px"/>
      <p style="font-size:11px;color:#bbb;margin:0">
        You're receiving this because you submitted a support request at theextendedessay.com.
      </p>
    </div>`
}

async function sendEmail({ apiKey, to, from, replyTo, subject, html }) {
  const body = { from, to: [to], subject, html }
  if (replyTo) body.reply_to = replyTo
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(JSON.stringify(await res.json()))
  return res.json()
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, subject, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: 'name, email, and message are required' }, { status: 400 })
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('contact: RESEND_API_KEY not set')
    return Response.json({ error: 'Email service not configured' }, { status: 500 })
  }

  const errors = []

  // 1. Notify you
  try {
    await sendEmail({
      apiKey,
      from: FROM_SUPPORT,
      to: SUPPORT_EMAIL,
      replyTo: email,
      subject: `[Support] ${subject || 'New message'} — from ${name}`,
      html: notificationHtml({ name, email, subject, message }),
    })
  } catch (err) {
    console.error('contact: notification failed', err.message)
    errors.push('notification')
  }

  // 2. Auto-reply to the student
  try {
    await sendEmail({
      apiKey,
      from: FROM_SUPPORT,
      to: email,
      subject: `Got your message — I'll reply within 24 hours`,
      html: autoReplyHtml({ name }),
    })
  } catch (err) {
    console.error('contact: auto-reply failed', err.message)
    errors.push('autoreply')
  }

  if (errors.length === 2) {
    return Response.json({ error: 'Failed to send emails' }, { status: 500 })
  }

  return Response.json({ success: true })
}
