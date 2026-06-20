import { createServiceClient } from '../../../src/lib/supabase'

const FROM = 'Gia from EE Academy <hello@theextendedessay.com>'

async function sendEmail({ apiKey, to, subject, html }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(JSON.stringify(err))
  }
  return res.json()
}

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
        You've got free access to Modules 1, 2, 3, and 5 — covering the mindset, IB criteria,
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

function day3Html(email) {
  const unsub = `https://theextendedessay.com/unsubscribe?email=${encodeURIComponent(email)}`
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#0a0a0a">
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">Hey,</p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        Quick check-in — how's your research question coming along?
      </p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        The RQ is the single most important decision in your EE. A weak RQ means even brilliant
        research won't score well. I wrote a guide on exactly what makes a strong one — with real
        examples across subjects:
      </p>
      <a href="https://theextendedessay.com/guides/research-question-examples"
        style="display:inline-block;background:#0a0a0a;color:#fff;text-decoration:none;
               padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;margin-bottom:28px">
        Read the RQ Guide →
      </a>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        If you want to go deeper — Modules 4–9 cover the full research and writing process,
        including how I structured my own 32/34 essay. That's in Method ($89, one-time).
      </p>
      <a href="https://theextendedessay.com/pricing"
        style="font-size:14px;color:#0a0a0a;border-bottom:1px solid #0a0a0a;text-decoration:none">
        See what's included →
      </a>
      <br/><br/>
      <p style="font-size:15px;line-height:1.7;margin:0 0 4px">Gia</p>
      <p style="font-size:13px;color:#888;margin:0">32/34 · EE Academy</p>
      <hr style="border:none;border-top:1px solid #f0f0f0;margin:32px 0 16px"/>
      <p style="font-size:11px;color:#bbb;margin:0">
        <a href="${unsub}" style="color:#bbb">Unsubscribe</a>
      </p>
    </div>`
}

function day7Html(email) {
  const unsub = `https://theextendedessay.com/unsubscribe?email=${encodeURIComponent(email)}`
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#0a0a0a">
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">Hey,</p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        One week in. I want to be straight with you — the free modules give you the foundation,
        but most students who score well have a clear system for the research and writing phases.
      </p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 8px"><strong>What Method unlocks ($89, one-time):</strong></p>
      <ul style="font-size:15px;line-height:1.8;margin:0 0 24px;padding-left:20px;color:#333">
        <li>Modules 4–9 (research, argument, structure, writing)</li>
        <li>EE Planner + Research Question Checker</li>
        <li>Essay editor with autosave</li>
        <li>The exact framework I used to score 32/34</li>
      </ul>
      <a href="https://theextendedessay.com/pricing"
        style="display:inline-block;background:#0a0a0a;color:#fff;text-decoration:none;
               padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;margin-bottom:28px">
        Unlock Method — $89 →
      </a>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        If now's not the right time, no pressure — your free access stays forever.
        And if you have questions, just reply here.
      </p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 4px">Gia</p>
      <p style="font-size:13px;color:#888;margin:0">32/34 · EE Academy</p>
      <hr style="border:none;border-top:1px solid #f0f0f0;margin:32px 0 16px"/>
      <p style="font-size:11px;color:#bbb;margin:0">
        <a href="${unsub}" style="color:#bbb">Unsubscribe</a>
      </p>
    </div>`
}

// Common disposable / temp-mail domains. Blocks the bulk of junk signups
// without an external API. Add to this list as new ones show up in your data.
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamailblock.com', 'sharklasers.com',
  '10minutemail.com', '10minutemail.net', 'tempmail.com', 'temp-mail.org', 'tempmail.net',
  'throwawaymail.com', 'yopmail.com', 'getnada.com', 'nada.email', 'trashmail.com',
  'dispostable.com', 'maildrop.cc', 'fakeinbox.com', 'mintemail.com', 'mohmal.com',
  'emailondeck.com', 'spamgourmet.com', 'mailnesia.com', 'tempinbox.com', 'mailcatch.com',
  'discard.email', 'einrot.com', 'fakemailgenerator.com', 'tempr.email', 'mailto.plus',
  '1secmail.com', '1secmail.org', '1secmail.net', 'inboxkitten.com', 'mailsac.com',
  'moakt.com', 'tmail.ws', 'tmpmail.org', 'burnermail.io', 'cuvox.de', 'dayrep.com',
  'wegwerfemail.de', 'trbvm.com', 'byom.de', 'spam4.me', 'grr.la', 'pokemail.net',
])

function validateEmail(raw) {
  const email = String(raw || '').trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { ok: false }
  const domain = email.split('@')[1]
  if (domain.length < 4 || DISPOSABLE_DOMAINS.has(domain)) return { ok: false }
  return { ok: true, email }
}

export async function POST(request) {
  try {
    const { email: rawEmail, source = 'unknown' } = await request.json()

    const check = validateEmail(rawEmail)
    if (!check.ok) {
      return Response.json({ error: 'Please use a valid, non-temporary email.' }, { status: 400 })
    }
    const email = check.email

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'Email service not configured' }, { status: 500 })
    }

    // Store in Supabase (upsert — don't re-trigger sequence if already subscribed)
    const supabase = createServiceClient()
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', email)
      .single()

    if (!existing) {
      await supabase.from('subscribers').insert({
        email,
        source,
        email_1_sent_at: new Date().toISOString(),
      })

      // Send welcome email to user
      await sendEmail({ apiKey, to: email, subject: 'Welcome to EE Academy — start here', html: welcomeHtml(email) })
    }

    // Always notify yourself (even for re-signups)
    sendEmail({ apiKey, to: 'gia432hz@gmail.com', subject: `New signup: ${email}`, html: `<p>${email} · ${source}</p>` }).catch(() => {})

    return Response.json({ success: true })
  } catch (err) {
    console.error('[Subscribe] Error:', err)
    return Response.json({ error: 'Failed to process' }, { status: 500 })
  }
}

// Named exports for the email templates so the cron route can use them
export { day3Html, day7Html }
