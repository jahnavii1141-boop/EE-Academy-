'use client'

import { useEffect } from 'react'

// Back-forward cache guard (2026-08). When the browser restores this page from
// bfcache — e.g. the user signs up, lands on the dashboard, then hits Back — the
// server components (and their auth() redirect) do NOT re-run, so a stale auth
// form would show. On bfcache restore we force a full reload, which re-runs the
// server-side "already signed in? → dashboard" check. Renders nothing.
export default function BFCacheGuard() {
  useEffect(() => {
    const onShow = (e) => { if (e.persisted) window.location.reload() }
    window.addEventListener('pageshow', onShow)
    return () => window.removeEventListener('pageshow', onShow)
  }, [])
  return null
}
