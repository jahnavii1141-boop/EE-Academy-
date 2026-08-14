'use client'

import { usePathname } from 'next/navigation'

// Google AdSense loader — public/marketing/SEO pages ONLY. The product
// experience (course lessons, dashboard, tools, auth/onboarding) stays ad-free
// so paying students never see ads (2026-08, owner: "keep premium ad free").
// usePathname resolves during SSR too, so on public pages the script is in the
// server-rendered <head> (React 19 hoists it) — good for AdSense verification.
const AD_FREE_PREFIXES = [
  '/dashboard', '/course', '/dump', '/planner', '/study-calendar',
  '/onboarding', '/sign-in', '/sign-up',
]

export default function AdSense() {
  const pathname = usePathname()
  if (AD_FREE_PREFIXES.some((p) => pathname?.startsWith(p))) return null
  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8652560449719165"
      crossOrigin="anonymous"
    />
  )
}
