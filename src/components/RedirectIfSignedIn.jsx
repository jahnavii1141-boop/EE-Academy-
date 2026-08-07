'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Anti-double-login guard (2026-08): if a user already has a valid Clerk
// session and lands on an auth page again — via the dashboard email gate's
// links, the share page, a stale redirect, or an OAuth pop-up that returns to
// the homepage — never show them Clerk's form a second time. Bounce them
// straight to where they were headed. One signup, one login, ever.
export default function RedirectIfSignedIn({ to = '/dashboard/home' }) {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (isLoaded && isSignedIn) router.replace(to)
  }, [isLoaded, isSignedIn, to, router])
  return null
}
