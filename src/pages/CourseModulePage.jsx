import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth, SignInButton } from '@clerk/clerk-react'
import { COURSE_MODULES } from '../data/courseContent'
import { useModuleProgress } from '../hooks/useModuleProgress'
import ContentRenderer from '../components/blocks/ContentRenderer'
import SEOHead from '../components/SEOHead'
import PostModuleGate from '../components/PostModuleGate'

// ─── Paywall banner ───────────────────────────────────────────────────────────

function PaywallBanner({ moduleTitle }) {
  return (
    <div className="relative mt-2 mb-8">
      {/* Fade-out mask */}
      <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-cream pointer-events-none z-10" />

      <div className="relative z-20 rounded-2xl border-2 border-navy/10 bg-parchment/50 p-8 text-center shadow-sm">
        <div className="w-12 h-12 rounded-full bg-navy/8 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-navy/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-bold text-navy mb-2">
          This module is part of the full course
        </h3>
        <p className="text-navy/60 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
          Enroll to unlock <span className="font-semibold text-navy">{moduleTitle}</span> and all 12 other modules — including the 32/34 essay analysis, the AI prompt library, and every template.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <SignInButton mode="modal">
            <button className="btn-primary text-sm">
              Sign In to Access
            </button>
          </SignInButton>
          <Link to="/pricing" className="btn-outline text-sm">
            View Pricing
          </Link>
        </div>
        <p className="text-xs text-navy/40 mt-4">30-day money-back guarantee · Lifetime access</p>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CourseModulePage() {
  const { moduleId } = useParams()
  const { isSignedIn, isLoaded } = useAuth()
  const { markVisited } = useModuleProgress()

  const moduleIndex = COURSE_MODULES.findIndex(m => m.id === moduleId)
  const module = COURSE_MODULES[moduleIndex]
  const prevModule = COURSE_MODULES[moduleIndex - 1]
  const nextModule = COURSE_MODULES[moduleIndex + 1]

  // Mark this module as visited in progress tracker when page loads
  useEffect(() => {
    if (module) markVisited(module.id)
  }, [module?.id]) // eslint-disable-line react-hooks/exhaustive-deps

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

  // Freemium logic: free modules always show all content
  // Paid modules show first 3 blocks as preview to non-auth users
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

      {/* ── Progress top bar ── */}
      <div className="sticky top-14 z-10 bg-cream/90 backdrop-blur-sm border-b border-navy/8 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <Link
            to="/courses"
            className="flex items-center gap-1.5 text-sm text-navy/50 hover:text-navy transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            All Modules
          </Link>

          {/* Module progress dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {COURSE_MODULES.map((m, i) => (
              <Link key={m.id} to={`/course/${m.id}`}>
                <span
                  title={m.title}
                  className={`block w-2 h-2 rounded-full transition-all ${
                    i === moduleIndex
                      ? 'bg-navy scale-125'
                      : i < moduleIndex
                      ? 'bg-navy/40'
                      : 'bg-navy/15'
                  }`}
                />
              </Link>
            ))}
          </div>

          <span className="text-xs text-navy/40 tabular-nums">
            {moduleIndex + 1} / {COURSE_MODULES.length}
          </span>
        </div>
        {/* Progress fill */}
        <div className="h-0.5 bg-navy/5">
          <div
            className="h-full bg-navy/30 transition-all duration-500"
            style={{ width: `${((moduleIndex + 1) / COURSE_MODULES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-3xl mx-auto px-6 pt-14 pb-20">

        {/* Module badge + title */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-cream font-serif font-bold text-sm flex-shrink-0">
              {module.number}
            </span>
            {module.free && (
              <span className="text-xs font-semibold text-green-700 bg-green-100 border border-green-200 px-2.5 py-1 rounded-full">
                Free
              </span>
            )}
            {isPaid && (
              <span className="text-xs font-semibold text-navy/50 bg-parchment/60 border border-navy/10 px-2.5 py-1 rounded-full">
                Pro
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy leading-tight mb-3">
            {module.title}
          </h1>
          <p className="text-navy/55 text-lg">{module.tagline}</p>

          <div className="mt-6 h-px bg-navy/8" />
        </div>

        {/* Article body */}
        <article>
          <ContentRenderer content={visibleContent} />
        </article>

        {/* Waitlist CTA after Module 2 */}
        {module.id === 'module-2' && !isGated && <PostModuleGate />}

        {/* Paywall (only if gated) */}
        {isGated && <PaywallBanner moduleTitle={module.title} />}

        {/* Loading state placeholder */}
        {isPaid && !isLoaded && (
          <div className="flex justify-center py-12">
            <div className="w-7 h-7 rounded-full border-[3px] border-navy/15 border-t-navy/50"
              style={{ animation: 'spin 0.8s linear infinite' }} />
          </div>
        )}

        {/* ── Bottom navigation ── */}
        {(!isGated || module.free) && (
          <div className="border-t border-navy/8 mt-16 pt-8 flex items-stretch justify-between gap-4">
            {prevModule ? (
              <Link
                to={`/course/${prevModule.id}`}
                className="flex items-center gap-3 group rounded-xl border border-navy/10 hover:border-navy/25 bg-parchment/30 hover:bg-parchment/50 transition-all px-5 py-4 flex-1 max-w-[48%]"
              >
                <svg className="w-4 h-4 text-navy/40 group-hover:text-navy transition-colors flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>
                  <span className="block text-xs text-navy/40 mb-0.5">Previous</span>
                  <span className="text-sm font-medium text-navy line-clamp-1">{prevModule.title}</span>
                </span>
              </Link>
            ) : <div className="flex-1 max-w-[48%]" />}

            {nextModule ? (
              <Link
                to={`/course/${nextModule.id}`}
                className="flex items-center justify-end gap-3 group rounded-xl border border-navy/10 hover:border-navy/25 bg-parchment/30 hover:bg-parchment/50 transition-all px-5 py-4 flex-1 max-w-[48%] text-right"
              >
                <span>
                  <span className="block text-xs text-navy/40 mb-0.5">Next</span>
                  <span className="text-sm font-medium text-navy line-clamp-1">{nextModule.title}</span>
                </span>
                <svg className="w-4 h-4 text-navy/40 group-hover:text-navy transition-colors flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
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
    </div>
  )
}
