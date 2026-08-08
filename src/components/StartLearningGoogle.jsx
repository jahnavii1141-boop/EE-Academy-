'use client'

import { useState } from 'react'
import { useAuth, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.6 34.6 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.6 5.6C41.4 36.3 44 30.7 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  )
}

// Simplified-homepage experiment variant CTA: ONE click, Google SSO only, no
// form. Starts Clerk's Google OAuth straight away (→ /sso-callback →
// /dashboard/home). Every branch is safe: signed-in users go to the dashboard;
// if Clerk isn't ready or OAuth init throws, we fall back to the reliable
// /sign-up page so the button can never silently do nothing.
export default function StartLearningGoogle({ className = '', label = 'Start learning with Google' }) {
  const { isSignedIn } = useAuth()
  const { isLoaded, signUp } = useSignUp()
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  const go = async () => {
    if (busy) return
    setBusy(true)
    try { posthog.capture('signup_cta_clicked', { variant: 'google_sso', signed_in: !!isSignedIn }) } catch (e) { /* optional */ }
    if (isSignedIn) { router.push('/dashboard/home'); return }
    if (!isLoaded) { router.push('/sign-up'); return }
    try {
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard/home',
      })
    } catch (e) {
      router.push('/sign-up')
    }
  }

  return (
    <button type="button" onClick={go} disabled={busy} aria-busy={busy} className={className}>
      {busy ? 'Loading…' : (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <GoogleIcon /> {label}
        </span>
      )}
    </button>
  )
}
