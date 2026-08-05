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

function PostHogIdentify() {
  const { isSignedIn, userId } = useAuth()
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return
    if (isSignedIn && userId) {
      // Tie events to the Clerk user id (no email/PII in properties)
      posthog.identify(userId)
    }
  }, [isSignedIn, userId])
  return null
}

export default function PostHogProvider({ children }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key) return // no key (e.g. local dev) — analytics off, site unaffected
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
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
