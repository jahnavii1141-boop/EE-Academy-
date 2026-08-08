'use client'

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'

// The one primary CTA, used on every page. Fixes the #1 funnel issue (2026-08):
// the old <SignUpButton mode="modal"> silently did nothing if Clerk's JS wasn't
// hydrated yet → rage clicks + abandonment. This ALWAYS responds instantly:
// shows a "Loading…" state on click and navigates to a real page (never a
// modal that can fail to open). Signed-in users go straight to the dashboard;
// everyone else to /sign-up (Google one-click at the top). A stale/loading
// session that lands on /sign-up is bounced to the dashboard by RedirectIfSignedIn.
export default function StartFreeButton({
  className = '',
  label = 'Start free',
  signedInLabel = 'Go to your dashboard',
  dest = '/sign-up',
  onNavigate,
}) {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const target = isSignedIn ? '/dashboard/home' : dest

  const go = () => {
    if (busy) return
    setBusy(true)
    if (onNavigate) onNavigate()
    try { posthog.capture('signup_cta_clicked', { signed_in: !!isSignedIn, dest: target }) } catch (e) { /* analytics optional */ }
    router.push(target)
  }

  return (
    <button type="button" onClick={go} disabled={busy} aria-busy={busy} className={className}>
      {busy ? 'Loading…' : (isSignedIn ? signedInLabel : label)}
    </button>
  )
}
