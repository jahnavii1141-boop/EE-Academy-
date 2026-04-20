const STORAGE_KEY = 'ee_waitlist_joined'

export async function submitEmail(email, source = 'unknown') {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    })
    if (!res.ok) throw new Error('API error')
  } catch (err) {
    console.error('[Email Capture] Failed:', err)
  }

  // Mark as joined in localStorage regardless (don't block UX on network errors)
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    email,
    source,
    joinedAt: new Date().toISOString(),
  }))

  return { success: true }
}

export function hasJoinedWaitlist() {
  return !!localStorage.getItem(STORAGE_KEY)
}

export const WAITLIST_COPY = {
  headline: 'Start with what actually worked',
  subline: 'Get instant access to free modules from the system that scored 32/34 — no card needed',
  cta: 'Get Free Access',
  successMessage: "You're in! Head to the dashboard to start your free modules.",
  placeholder: 'your@email.com',
}
