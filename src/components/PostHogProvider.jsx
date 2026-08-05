'use client'

// PostHog analytics — manual equivalent of what `npx @posthog/wizard` writes
// for the Next.js App Router (the wizard needs a TTY, so this is hand-rolled).
//
// Env (client-safe — the phc_ project key ships in the browser bundle by design):
//   NEXT_PUBLIC_POSTHOG_KEY   phc_...   (required; analytics silently off without it)
//   NEXT_PUBLIC_POSTHOG_HOST  optional; defaults to the US cloud

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'

// Project API key — public by design (ships in the browser bundle; this is how
// the official wizard writes it too). Env var overrides if ever rotated.
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_A7qq5ZuVe8ibwJ2Z25SxE5VHGzjLs2L3Tu5ZQVziWrCA'

function PostHogIdentify() {
  const { isSignedIn, userId } = useAuth()
  useEffect(() => {
    if (!POSTHOG_KEY) return
    if (isSignedIn && userId) {
      // Tie events to the Clerk user id (no email/PII in properties)
      posthog.identify(userId)
    }
  }, [isSignedIn, userId])
  return null
}

export default function PostHogProvider({ children }) {
  useEffect(() => {
    if (!POSTHOG_KEY) return // no key — analytics off, site unaffected
    posthog.init(POSTHOG_KEY, {
      // Reverse proxy through our own domain (see next.config.js rewrites) so
      // adblockers can't intercept events. ui_host keeps toolbar/links working.
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      // 2025 defaults: automatic pageviews on App Router history changes,
      // pageleave capture, sane autocapture
      defaults: '2025-05-24',
      capture_exceptions: true,
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <PostHogIdentify />
      {children}
    </PHProvider>
  )
}
