import { createServiceClient } from '../../../src/lib/supabase'
import { day3Html, day7Html } from '../subscribe/route'
import { safeEqual, maskEmail } from '@/lib/security'

const FROM = 'The Extended Essay Academy <hello@theextendedessay.com>'

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

// Called by Vercel cron daily at 10:00 UTC
// Sends day-3 and day-7 emails to eligible subscribers
export async function GET(request) {
  // Protect the cron endpoint — Vercel sets this header automatically
  const authHeader = request.headers.get('authorization')
  if (!process.env.CRON_SECRET || !safeEqual(authHeader, `Bearer ${process.env.CRON_SECRET}`)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'Email service not configured' }, { status: 500 })
  }

  const supabase = createServiceClient()
  const now = new Date().toISOString()

  let sent2 = 0
  let sent3 = 0
  const errors = []

  // ── Day 3: subscribed >= 3 days ago, day-3 email not yet sent, not unsubscribed, not yet a customer ──
  // Rule: the moment someone pays, marketing sequences stop. Only post-purchase emails run.
  // We filter out subscribers where paid_at IS NOT NULL (set by paddle-webhook on purchase).
  const { data: day3Subscribers, error: e1 } = await supabase
    .from('subscribers')
    .select('id, email')
    .is('email_2_sent_at', null)
    .is('unsubscribed_at', null)
    .is('paid_at', null)
    .lte('subscribed_at', new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString())

  if (e1) {
    errors.push(`day3 query: ${e1.message}`)
  } else {
    for (const sub of day3Subscribers ?? []) {
      try {
        await sendEmail({
          apiKey,
          to: sub.email,
          subject: "How's your research question coming along?",
          html: day3Html(sub.email),
        })
        await supabase
          .from('subscribers')
          .update({ email_2_sent_at: now })
          .eq('id', sub.id)
        sent2++
      } catch (err) {
        errors.push(`day3 ${maskEmail(sub.email)}: ${err.message}`)
      }
    }
  }

  // ── Day 7: subscribed >= 7 days ago, day-7 email not yet sent, not unsubscribed, not yet a customer ──
  const { data: day7Subscribers, error: e2 } = await supabase
    .from('subscribers')
    .select('id, email')
    .is('email_3_sent_at', null)
    .is('unsubscribed_at', null)
    .is('paid_at', null)
    .lte('subscribed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  if (e2) {
    errors.push(`day7 query: ${e2.message}`)
  } else {
    for (const sub of day7Subscribers ?? []) {
      try {
        await sendEmail({
          apiKey,
          to: sub.email,
          subject: "One week in \u2014 here's what the full course unlocks",
          html: day7Html(sub.email),
        })
        await supabase
          .from('subscribers')
          .update({ email_3_sent_at: now })
          .eq('id', sub.id)
        sent3++
      } catch (err) {
        errors.push(`day7 ${maskEmail(sub.email)}: ${err.message}`)
      }
    }
  }

  console.log(`[email-sequence] day3: ${sent2} sent, day7: ${sent3} sent, errors: ${errors.length}`)

  return Response.json({
    day3_sent: sent2,
    day7_sent: sent3,
    errors: errors.length || undefined,
  })
}
