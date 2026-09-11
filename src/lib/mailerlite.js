// ── MailerLite API client ─────────────────────────────────────────────────────
// Reads the token from MAILERLITE_API_KEY (set in .env.local + Vercel) — never
// hardcode it. Optional MAILERLITE_GROUP_ID adds new subscribers to a group.
// Base: https://connect.mailerlite.com/api · Bearer auth · JSON in/out.
// Docs: https://developers.mailerlite.com/docs
const BASE = 'https://connect.mailerlite.com/api'

export function mailerliteConfigured() {
  return !!process.env.MAILERLITE_API_KEY
}

// Create or update a subscriber (MailerLite upserts by email). Fail-soft:
// returns a result object rather than throwing, so callers can ignore failures
// without breaking the signup flow.
export async function upsertSubscriber({ email, fields, groups } = {}) {
  const token = process.env.MAILERLITE_API_KEY
  if (!token) return { ok: false, skipped: 'MAILERLITE_API_KEY not set' }
  if (!email) return { ok: false, error: 'email required' }

  const body = { email }
  if (fields && Object.keys(fields).length) body.fields = fields
  const group = groups ?? (process.env.MAILERLITE_GROUP_ID || null)
  if (group) body.groups = Array.isArray(group) ? group : [group]

  try {
    const res = await fetch(`${BASE}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      return { ok: false, status: res.status, error: detail.slice(0, 300) }
    }
    return { ok: true, data: await res.json().catch(() => null) }
  } catch (err) {
    return { ok: false, error: String(err?.message || err) }
  }
}
