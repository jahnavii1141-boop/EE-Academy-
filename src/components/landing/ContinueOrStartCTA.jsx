'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { useModuleProgress } from '@/hooks/useModuleProgress'
import { COURSE_CATALOG } from '@/data/courseCatalog'
import posthog from 'posthog-js'

// Lessons-first hero CTA (2026-08). Primary action opens a lesson, never an
// auth screen. Signed-in returners who've started get "Continue where you left
// off"; everyone else gets "Start lesson 1". No modal, no email gate.
export default function ContinueOrStartCTA({ className = '' }) {
  const { isSignedIn } = useAuth()
  const { isVisited } = useModuleProgress()

  const started = COURSE_CATALOG.some((m) => isVisited(m.id))
  const next = COURSE_CATALOG.find((m) => !isVisited(m.id)) || COURSE_CATALOG[0]
  const resuming = isSignedIn && started
  const href = resuming ? `/course/${next.id}` : '/course/module-1'
  const label = resuming ? 'Continue where you left off' : 'Start lesson 1'

  return (
    <Link
      href={href}
      className={className}
      onClick={() => { try { posthog.capture('hero_cta_click', { signed_in: !!isSignedIn, dest: href }) } catch (e) { /* optional */ } }}
    >
      {label} →
    </Link>
  )
}
