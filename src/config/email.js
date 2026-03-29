// Email provider integration
// TODO: Wire to ConvertKit, Mailchimp, or your preferred email service
// Replace the submitEmail function body with your API call

const STORAGE_KEY = 'ee_waitlist_joined'

export async function submitEmail(email, source = 'unknown', tags = []) {
  // TODO: Replace with real API call to your email provider
  // Example for ConvertKit:
  // const res = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ api_key: 'YOUR_API_KEY', email, tags }),
  // })

  console.log('[Email Capture]', { email, source, tags })

  // Mark as joined in localStorage
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
  headline: 'Join the waitlist',
  subline: 'Get early bird pricing ($71 instead of $89) + a free EE planning tool',
  cta: 'Join Waitlist',
  successMessage: "You're on the list! Check your inbox.",
  placeholder: 'your@email.com',
}
