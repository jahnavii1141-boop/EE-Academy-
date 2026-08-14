'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Google AdSense loader — public/marketing/SEO pages ONLY. The product
// experience (course lessons, dashboard, tools, auth/onboarding) stays ad-free
// so paying students never see ads (2026-08, owner: "keep premium ad free").
const AD_FREE_PREFIXES = [
  '/dashboard', '/course', '/dump', '/planner', '/study-calendar',
  '/onboarding', '/sign-in', '/sign-up',
]
const SRC =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8652560449719165'

export default function AdSense() {
  const pathname = usePathname()
  const adFree = AD_FREE_PREFIXES.some((p) => pathname?.startsWith(p))

  // usePathname is null during static prerendering, so a statically pre-rendered
  // ad-free page (e.g. /onboarding, /study-calendar) can still ship the script in
  // its SSR HTML. Once the client resolves the real path we strip it — this also
  // removes the loader on SPA navigation from a public page into a paid lesson,
  // so the paid area stays ad-free even after a client-side transition.
  useEffect(() => {
    if (!adFree) return
    document
      .querySelectorAll(`script[src="${SRC}"]`)
      .forEach((el) => el.remove())
  }, [adFree, pathname])

  // On public pages the script renders in the server-rendered <head> (React 19
  // hoists it) — good for AdSense verification. On ad-free pages resolved at SSR
  // (dynamic routes: /course/*, /dashboard/*) it's omitted from the start.
  if (adFree) return null
  return <script async src={SRC} crossOrigin="anonymous" />
}
