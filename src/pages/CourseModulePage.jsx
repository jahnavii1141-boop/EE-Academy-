import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth, SignInButton } from '@clerk/clerk-react'
import { COURSE_MODULES } from '../data/courseContent'
import { useModuleProgress } from '../hooks/useModuleProgress'
import ContentRenderer from '../components/blocks/ContentRenderer'
import SEOHead from '../components/SEOHead'
import PostModuleGate from '../components/PostModuleGate'

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function ModuleSidebar({ currentIndex, isSignedIn, isLoaded }) {
  const { isVisited } = useModuleProgress()
  const visitedCount = COURSE_MODULES.filter(m => isVisited(m.id)).length
  const pct = Math.round((visitedCount / COURSE_MODULES.length) * 100)

  return (
    <nav className="flex flex-col h-full">
      {/* Module list */}
      <div className="flex-1 overflow-y-auto py-5 px-4 space-y-0.5">
        <p className="text-[0.65rem] font-semibold text-navy/35 uppercase tracking-[0.15em] mb-3 px-2">
          Course Modules
        </p>
        {COURSE_MODULES.map((m, i) => {
          const isCurrent = i === currentIndex
          const visited = isVisited(m.id)
          const isLocked = !m.free && isLoaded && !isSignedIn

          return (
            <Link
              key={m.id}
              to={`/course/${m.id}`}
              className={`
                group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-colors
                ${isCurrent
                  ? 'bg-navy/6 text-navy font-medium'
                  : 'text-navy/50 hover:text-navy/70 hover:bg-navy/[0.03]'
                }
              `}
            >
              {/* Status indicator */}
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-navy" />
                ) : visited ? (
                  <svg className="w-4 h-4 text-emerald-500/70" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : isLocked ? (
                  <svg className="w-3.5 h-3.5 text-navy/25" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-navy/15" />
                )}
              </span>

              {/* Module title */}
              <span className="truncate leading-snug">
                <span className="text-navy/30 text-xs mr-1.5">{m.number}.</span>
                {m.title}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Progress footer */}
      <div className="border-t border-navy/6 px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[0.65rem] font-semibold text-navy/35 uppercase tracking-wider">Progress</span>
          <span className="text-xs text-navy/40 tabular-nums">{visitedCount}/{COURSE_MODULES.length}</span>
        </div>
        <div className="h-1 bg-navy/6 rounded-full">
          <div
            className="h-full bg-navy/25 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </nav>
  )
}

// ─── Mobile module drawer ─────────────────────────────────────────────────────

function MobileModuleDrawer({ isOpen, onClose, currentIndex, isSignedIn, isLoaded }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy/20 backdrop-blur-sm" onClick={onClose} />
      {/* Drawer */}
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-cream border-r border-navy/8 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-navy/6">
          <span className="text-sm font-semibold text-navy">Modules</span>
          <button onClick={onClose} className="text-navy/40 hover:text-navy p-1">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
          <ModuleSidebar currentIndex={currentIndex} isSignedIn={isSignedIn} isLoaded={isLoaded} />
        </div>
      </div>
    </div>
  )
}

// ─── Paywall banner ───────────────────────────────────────────────────────────

function PaywallBanner({ moduleTitle }) {
  return (
    <div className="relative mt-2 mb-8">
      {/* Fade-out mask */}
      <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-cream pointer-events-none z-10" />

      <div className="relative z-20 rounded-xl border border-navy/10 bg-parchment/30 p-8 text-center">
        <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-4">
          <svg className="w-5 h-5 text-navy/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-bold text-navy mb-2">
          This module is part of the full course
        </h3>
        <p className="text-navy/55 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
          Enroll to unlock <span className="font-medium text-navy">{moduleTitle}</span> and all 12 other modules — including the 32/34 essay analysis, AI prompt library, and every template.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <SignInButton mode="modal">
            <button className="btn-primary text-sm">
              Sign In to Access
            </button>
          </SignInButton>
          <Link to="/pricing" className="btn-outline text-sm">
            View Plans
          </Link>
        </div>
        <p className="text-xs text-navy/35 mt-4">7-day money-back guarantee · Lifetime access</p>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CourseModulePage() {
  const { moduleId } = useParams()
  const { isSignedIn, isLoaded } = useAuth()
  const { markVisited } = useModuleProgress()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const moduleIndex = COURSE_MODULES.findIndex(m => m.id === moduleId)
  const module = COURSE_MODULES[moduleIndex]
  const prevModule = COURSE_MODULES[moduleIndex - 1]
  const nextModule = COURSE_MODULES[moduleIndex + 1]

  // Mark this module as visited
  useEffect(() => {
    if (module) markVisited(module.id)
  }, [module?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Close drawer on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrawerOpen(false)
  }, [moduleId])

  if (!module) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-navy/50 mb-4">Module not found.</p>
          <Link to="/courses" className="btn-primary">Back to Courses</Link>
        </div>
      </div>
    )
  }

  const isPaid = !module.free
  const isGated = isPaid && isLoaded && !isSignedIn
  const visibleContent = isGated ? module.content.slice(0, 3) : module.content

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title={`Module ${module.number}: ${module.title}`}
        description={module.tagline}
        canonical={`/course/${module.id}`}
        noindex={isPaid}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: module.title,
          description: module.tagline,
          provider: { '@type': 'Organization', name: 'The Extended Essay Academy' },
        }}
      />

      {/* ── Top bar ── */}
      <div className="sticky top-14 z-30 bg-cream/90 backdrop-blur-sm border-b border-navy/6">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile: module drawer toggle */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden text-navy/40 hover:text-navy p-1 -ml-1"
              aria-label="Open module list"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <Link
              to="/courses"
              className="flex items-center gap-1.5 text-sm text-navy/40 hover:text-navy transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">All Modules</span>
            </Link>
          </div>

          {/* Mobile progress dots */}
          <div className="flex lg:hidden items-center gap-1">
            {COURSE_MODULES.map((m, i) => (
              <Link key={m.id} to={`/course/${m.id}`}>
                <span
                  title={m.title}
                  className={`block w-1.5 h-1.5 rounded-full transition-all ${
                    i === moduleIndex
                      ? 'bg-navy scale-125'
                      : i < moduleIndex
                      ? 'bg-navy/30'
                      : 'bg-navy/10'
                  }`}
                />
              </Link>
            ))}
          </div>

          <span className="text-xs text-navy/35 tabular-nums">
            {moduleIndex + 1} / {COURSE_MODULES.length}
          </span>
        </div>
        {/* Mobile progress bar */}
        <div className="h-px bg-navy/5 lg:hidden">
          <div
            className="h-full bg-navy/20 transition-all duration-500"
            style={{ width: `${((moduleIndex + 1) / COURSE_MODULES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Layout: Sidebar + Content ── */}
      <div className="max-w-screen-2xl mx-auto flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-navy/6 sticky top-[calc(3.5rem+2.75rem)] h-[calc(100vh-3.5rem-2.75rem)]">
          <ModuleSidebar currentIndex={moduleIndex} isSignedIn={isSignedIn} isLoaded={isLoaded} />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-6 pt-12 pb-20">

            {/* Module header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-navy/35 uppercase tracking-wider">
                  Module {module.number}
                </span>
                {module.free && (
                  <span className="text-[0.65rem] font-semibold text-emerald-600/70 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-full">
                    Free
                  </span>
                )}
                {isPaid && (
                  <span className="text-[0.65rem] font-semibold text-navy/40 bg-navy/5 border border-navy/8 px-2 py-0.5 rounded-full">
                    Pro
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy leading-tight mb-3">
                {module.title}
              </h1>
              <p className="text-navy/50 text-lg leading-relaxed">{module.tagline}</p>

              <div className="mt-8 h-px bg-navy/6" />
            </div>

            {/* Article body */}
            <article className="prose-ee">
              <ContentRenderer content={visibleContent} />
            </article>

            {/* Waitlist CTA after Module 2 */}
            {module.id === 'module-2' && !isGated && <PostModuleGate />}

            {/* Paywall */}
            {isGated && <PaywallBanner moduleTitle={module.title} />}

            {/* Loading state */}
            {isPaid && !isLoaded && (
              <div className="flex justify-center py-12">
                <div className="w-6 h-6 rounded-full border-2 border-navy/10 border-t-navy/40"
                  style={{ animation: 'spin 0.8s linear infinite' }} />
              </div>
            )}

            {/* ── Bottom navigation ── */}
            {(!isGated || module.free) && (
              <div className="border-t border-navy/6 mt-16 pt-8 flex items-stretch justify-between gap-4">
                {prevModule ? (
                  <Link
                    to={`/course/${prevModule.id}`}
                    className="flex items-center gap-3 group rounded-lg border border-navy/8 hover:border-navy/15 hover:bg-parchment/20 transition-all px-5 py-4 flex-1 max-w-[48%]"
                  >
                    <svg className="w-4 h-4 text-navy/30 group-hover:text-navy/50 transition-colors flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    <span>
                      <span className="block text-[0.65rem] text-navy/35 uppercase tracking-wider mb-0.5">Previous</span>
                      <span className="text-sm font-medium text-navy line-clamp-1">{prevModule.title}</span>
                    </span>
                  </Link>
                ) : <div className="flex-1 max-w-[48%]" />}

                {nextModule ? (
                  <Link
                    to={`/course/${nextModule.id}`}
                    className="flex items-center justify-end gap-3 group rounded-lg border border-navy/8 hover:border-navy/15 hover:bg-parchment/20 transition-all px-5 py-4 flex-1 max-w-[48%] text-right"
                  >
                    <span>
                      <span className="block text-[0.65rem] text-navy/35 uppercase tracking-wider mb-0.5">Next</span>
                      <span className="text-sm font-medium text-navy line-clamp-1">{nextModule.title}</span>
                    </span>
                    <svg className="w-4 h-4 text-navy/30 group-hover:text-navy/50 transition-colors flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                ) : (
                  <div className="flex items-center justify-end flex-1 max-w-[48%]">
                    <Link to="/" className="btn-primary text-sm">Back to Home</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
      <MobileModuleDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentIndex={moduleIndex}
        isSignedIn={isSignedIn}
        isLoaded={isLoaded}
      />
    </div>
  )
}
