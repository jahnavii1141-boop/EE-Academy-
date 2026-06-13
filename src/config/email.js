const STORAGE_KEY = 'ee_waitlist_joined'

export function submitEmail(email, source = 'unknown') {
  // Fire-and-forget — Resend takes ~8s, don't block the user
  fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source }),
  }).catch(err => console.error('[Email Capture] Failed:', err))

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      email,
      source,
      joinedAt: new Date().toISOString(),
    }))
  }

  return { success: true }
}

export function hasJoinedWaitlist() {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem(STORAGE_KEY)
}

export const WAITLIST_COPY = {
  headline: 'Start with what actually worked',
  subline: 'Get instant access to free modules from the system that scored 32/34.',
  cta: 'Get Free Access',
  successMessage: "You're in! Head to the dashboard to start your free modules.",
  placeholder: 'your@email.com',
}
