'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

// Fires a single PostHog event when the page mounts. Used for funnel steps that
// map to a page view (signin_start, pricing_view). Renders nothing.
export default function CaptureOnMount({ event, props = {} }) {
  useEffect(() => {
    try { posthog.capture(event, props) } catch (e) { /* analytics optional */ }
  }, [event]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}
