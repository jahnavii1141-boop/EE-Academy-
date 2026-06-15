#!/usr/bin/env node
/**
 * Find Clerk users who never received a welcome email and optionally send to them.
 *
 * Usage:
 *   node scripts/recover-welcome-emails.js           # dry-run: print list only
 *   node scripts/recover-welcome-emails.js --send    # actually send to missing users
 *
 * Required env vars (reads from .env.local automatically):
 *   CLERK_SECRET_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   RESEND_API_KEY (only needed for --send)
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// ── Load .env.local without requiring dotenv ──────────────────────────────────
try {
  const env = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8')
  for (const line of env.split('\n')) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '')
    }
  }
} catch { /* .env.local not found — use existing process.env */ }

const SEND   = process.argv.includes('--send')
const LIMIT  = 500   // Clerk max per page

const CLERK_KEY       = process.env.CLERK_SECRET_KEY
const SUPABASE_URL    = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY    = process.env.SUPABASE_SERVICE_ROLE_KEY
const RESEND_KEY      = process.env.RESEND_API_KEY
const FROM            = 'Gia from EE Academy <hello@theextendedessay.com>'

if (!CLERK_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing env vars: CLERK_SECRET_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
if (SEND && !RESEND_KEY) {
  console.error('Missing RESEND_API_KEY — required for --send mode')
  process.exit(1)
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function clerkRequest(path) {
  const res = await fetch(`https://api.clerk.com/v1${path}`, {
    headers: { Authorization: `Bearer ${CLERK_KEY}` },
  })
  if (!res.ok) throw new Error(`Clerk API ${res.status}: ${await res.text()}`)
  return res.json()
}

async function supabaseRequest(path, opts = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    headers: {
      apikey:          SUPABASE_KEY,
      Authorization:   `Bearer ${SUPABASE_KEY}`,
      'Content-Type':  'application/json',
      Prefer:          'return=minimal',
      ...opts.headers,
    },
    ...opts,
  })
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`)
  const text = await res.text()
  return text ? JSON.parse(text) : null
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
        You've got access to Modules 1, 2, 3, and 5 — covering the mindset, IB criteria,
        subject selection, topic choice, and the research system I used. Start here:
      </p>
      <a href="https://theextendedessay.com/course/module-1"
        style="display:inline-block;background:#0a0a0a;color:#fff;text-decoration:none;
               padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;margin-bottom:28px">
        Start Module 1 →
      </a>
      <p style="font-size:15px;line-height:1.7;margin:0 0 20px">
        If you have a question about your EE — research question, subject choice, structure —
        just reply to this email. I read everything.
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

async function sendWelcomeEmail(email) {
  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body:    JSON.stringify({
      from:    FROM,
      to:      [email],
      subject: 'Welcome to EE Academy — start here',
      html:    welcomeHtml(email),
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Resend ${res.status}: ${JSON.stringify(err)}`)
  }
  return res.json()
}

// ── Fetch all Clerk users (paginated) ─────────────────────────────────────────

async function getAllClerkUsers() {
  const users = []
  let offset = 0
  while (true) {
    const page = await clerkRequest(`/users?limit=${LIMIT}&offset=${offset}`)
    if (!page.length) break
    users.push(...page)
    if (page.length < LIMIT) break
    offset += LIMIT
  }
  return users
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n=== Welcome Email Recovery (${SEND ? 'SEND MODE' : 'DRY RUN'}) ===\n`)

  // 1. Get all Clerk users
  console.log('Fetching Clerk users…')
  const clerkUsers = await getAllClerkUsers()
  console.log(`  Found ${clerkUsers.length} total Clerk users\n`)

  // 2. Get all emails that already have a welcome email recorded
  console.log('Fetching subscriber records…')
  const sent = await supabaseRequest(
    '/subscribers?select=email,email_1_sent_at&email_1_sent_at=not.is.null',
    { headers: { Prefer: 'return=representation' } }
  )
  const sentEmails = new Set((sent ?? []).map(r => r.email.toLowerCase()))
  console.log(`  Found ${sentEmails.size} emails with welcome_sent record\n`)

  // 3. Find Clerk users missing a welcome email record
  const missing = []
  for (const user of clerkUsers) {
    const emailObj = (user.email_addresses ?? []).find(e => e.id === user.primary_email_address_id)
    const email = emailObj?.email_address
    if (!email) continue
    if (!sentEmails.has(email.toLowerCase())) {
      missing.push({ clerkId: user.id, email, createdAt: new Date(user.created_at).toISOString() })
    }
  }

  console.log(`Users missing welcome email: ${missing.length}`)
  if (!missing.length) {
    console.log('  Nothing to do.\n')
    return
  }

  console.log('\n  Clerk ID                              Email                          Signed up')
  console.log('  ' + '-'.repeat(90))
  for (const u of missing) {
    console.log(`  ${u.clerkId.padEnd(38)} ${u.email.padEnd(35)} ${u.createdAt}`)
  }

  if (!SEND) {
    console.log(`\n→ Dry run complete. Run with --send to email these ${missing.length} users.\n`)
    return
  }

  // 4. Send to each missing user (only in --send mode)
  console.log('\nSending welcome emails…\n')
  let sent_count = 0
  let failed_count = 0
  const now = new Date().toISOString()

  for (const u of missing) {
    try {
      await sendWelcomeEmail(u.email)

      // Record in subscribers table
      const { error: insertError } = await supabaseRequest('/subscribers', {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ email: u.email, source: 'recovery-script', subscribed_at: now, email_1_sent_at: now }),
      }).then(() => ({ error: null })).catch(async e => {
        // Might conflict if they're in subscribers but email_1_sent_at was null
        if (e.message?.includes('23505') || e.message?.includes('duplicate')) {
          await supabaseRequest(`/subscribers?email=eq.${encodeURIComponent(u.email)}`, {
            method:  'PATCH',
            headers: { Prefer: 'return=minimal' },
            body:    JSON.stringify({ email_1_sent_at: now }),
          })
          return { error: null }
        }
        return { error: e }
      })

      if (insertError) throw insertError

      console.log(`  ✓ ${u.email} (${u.clerkId})`)
      sent_count++

      // Small delay to respect Resend rate limits
      await new Promise(r => setTimeout(r, 200))
    } catch (err) {
      console.error(`  ✗ ${u.email} (${u.clerkId}): ${err.message}`)
      failed_count++
    }
  }

  console.log(`\nDone. Sent: ${sent_count}, Failed: ${failed_count}\n`)
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
