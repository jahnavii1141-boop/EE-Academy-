'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { COURSE_CATALOG } from '../data/courseCatalog'
import { useModuleProgress } from '../hooks/useModuleProgress'
import ContentRenderer from '../components/blocks/ContentRenderer'
import PostModuleGate from '../components/PostModuleGate'
import posthog from 'posthog-js'

// ─── Sidebar ───────────────────────────────────────────────────────────────────

function ModuleSidebar({ currentIndex, isLoaded, hasStandard, hasPremium }) {
  const { isVisited } = useModuleProgress()
  const visitedCount = COURSE_CATALOG.filter(m => isVisited(m.id)).length
  const pct = Math.round((visitedCount / COURSE_CATALOG.length) * 100)

  const SECTIONS = [
    { label: 'Foundation',  ids: ['module-1', 'module-2', 'module-3'] },
    { label: 'Research',    ids: ['module-4', 'module-5', 'module-6'] },
    { label: 'Writing',     ids: ['module-7', 'module-8', 'module-9', 'module-10', 'module-11'] },
    { label: 'Advanced',    ids: ['ai-module', 'module-13', 'module-14'] },
  ]

  return (
    <nav className="flex flex-col h-full bg-white" style={{ borderRight: '1px solid #f0f0f0' }}>
      {/* Logo / back */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid #EAE8DC' }}>
        <Link href="/dashboard/modules"
          className="inline-flex items-center gap-1.5 text-xs font-medium mb-4 transition-colors"
          style={{ color: '#bbb' }}
          onMouseEnter={e => e.currentTarget.style.color = '#2E3250'}
          onMouseLeave={e => e.currentTarget.style.color = '#bbb'}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          All guides
        </Link>

        {/* Progress bar */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#ccc' }}>Your progress</span>
          <span className="text-[10px] tabular-nums font-medium" style={{ color: '#aaa' }}>{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#f0f0f0' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #2E3250, #555)' }}
          />
        </div>
        <p className="text-[10px] mt-1.5" style={{ color: '#ccc' }}>{visitedCount} of {COURSE_CATALOG.length} completed</p>
      </div>

      {/* Guide list */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {SECTIONS.map(section => {
          const mods = COURSE_CATALOG.filter(m => section.ids.includes(m.id))
          return (
            <div key={section.label} className="mb-5">
              <p className="text-[9px] font-semibold uppercase tracking-widest px-2 mb-2" style={{ color: '#ccc' }}>
                {section.label}
              </p>
              {mods.map((m) => {
                const idx = COURSE_CATALOG.findIndex(mod => mod.id === m.id)
                const isCurrent = idx === currentIndex
                const visited = isVisited(m.id)
                const isAi = m.id === 'ai-module'
                const isLocked = isLoaded && !m.free && (isAi ? !hasPremium : !hasStandard)

                return (
                  <Link
                    key={m.id}
                    href={`/course/${m.id}`}
                    className="group flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all mb-0.5"
                    style={{
                      background: isCurrent ? '#EAE8DC' : 'transparent',
                      color: isCurrent ? '#2E3250' : '#999',
                    }}
                    onMouseEnter={e => { if (!isCurrent) { e.currentTarget.style.background = '#F4F3E8'; e.currentTarget.style.color = '#2E3250' } }}
                    onMouseLeave={e => { if (!isCurrent) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#999' } }}>

                    {/* Status icon */}
                    <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                      {visited && !isCurrent ? (
                        <svg width="13" height="13" viewBox="0 0 20 20" fill="#22c55e">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full" style={{ background: '#2E3250' }} />
                      ) : isLocked ? (
                        <svg width="11" height="11" viewBox="0 0 20 20" fill="#ddd">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#e0e0e0' }} />
                      )}
                    </span>

                    <span className="text-[0.8125rem] leading-snug truncate" style={{ fontWeight: isCurrent ? 600 : 400, letterSpacing: '-0.01em' }}>
                      <span className="mr-1.5 tabular-nums" style={{ color: '#d0d0d0', fontSize: '0.7rem' }}>{m.number}</span>
                      {m.title}
                    </span>

                    {/* Free badge */}
                    {m.free && !isCurrent && (
                      <span className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: '#f0fdf4', color: '#16a34a', flexShrink: 0 }}>
                        free
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

// ─── Mobile Drawer ─────────────────────────────────────────────────────────────

function MobileModuleDrawer({ isOpen, onClose, currentIndex, isLoaded, hasStandard, hasPremium }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 shadow-2xl overflow-hidden bg-white">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <span className="text-sm font-semibold text-[#2E3250]">Guides</span>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#EAE8DC] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="#aaa">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
          <ModuleSidebar currentIndex={currentIndex} isLoaded={isLoaded} hasStandard={hasStandard} hasPremium={hasPremium} />
        </div>
      </div>
    </div>
  )
}

// ─── Paywall Banner ────────────────────────────────────────────────────────────

function PaywallBanner({ isPremiumOnly, isSignedIn, moduleId }) {
  useEffect(() => {
    try { posthog.capture('paywall_view', { lesson: moduleId, premium_only: !!isPremiumOnly, signed_in: !!isSignedIn }) } catch (e) { /* optional */ }
  }, [moduleId, isPremiumOnly, isSignedIn])
  // After sign-in, come back to this exact lesson — not the dashboard.
  const signInHref = `/sign-in?redirect_url=${encodeURIComponent(`/course/${moduleId}`)}`
  return (
    <div className="relative mt-4 mb-8">
      {/* Fade overlay */}
      <div className="absolute -top-28 left-0 right-0 h-28 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #F4F3E8)' }} />
      {/* Card */}
      <div className="relative z-20 rounded-2xl p-10 text-center bg-white" style={{ border: '1px solid #e8e8e8', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: '#EAE8DC' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.75">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h3 className="font-semibold text-[#2E3250] text-xl mb-2" style={{ letterSpacing: '-0.02em' }}>
          {isPremiumOnly ? 'A Premium lesson' : 'Unlock the full course'}
        </h3>
        <p className="text-sm max-w-xs mx-auto mb-8 leading-relaxed" style={{ color: '#999' }}>
          {isPremiumOnly
            ? 'This lesson is part of Premium — the full course plus the writing tools and AI guidance.'
            : 'Unlock the rest of the course — all 14 lessons, the complete writing system, and the real 32/34 essay marked line by line.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-center">
          {!isSignedIn && (
            <Link href={signInHref}
              className="text-sm font-medium px-5 py-2.5 rounded-xl transition-all border hover:border-[#2E3250] hover:text-[#2E3250]"
              style={{ background: '#fff', color: '#555', borderColor: '#e0e0e0' }}>
              Sign in
            </Link>
          )}
          <Link href="/pricing"
            className="text-sm font-semibold px-6 py-2.5 rounded-xl transition-all hover:opacity-90"
            style={{ background: '#2E3250', color: '#fff' }}>
            {isPremiumOnly ? 'See Premium →' : 'See plans →'}
          </Link>
        </div>
        <p className="text-xs mt-6" style={{ color: '#ccc' }}>30-day money-back guarantee · Paid once, lifetime access</p>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CourseModulePage({ module, hasPaid, isSignedIn, isGated }) {
  const moduleId = module.id
  const { markVisited } = useModuleProgress()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const moduleIndex = COURSE_CATALOG.findIndex(m => m.id === moduleId)
  const prevModule = COURSE_CATALOG[moduleIndex - 1]
  const nextModule = COURSE_CATALOG[moduleIndex + 1]

  useEffect(() => { if (module) markVisited(module.id) }, [module?.id]) // eslint-disable-line
  useEffect(() => { setDrawerOpen(false) }, [moduleId]) // eslint-disable-line
  useEffect(() => {
    try { posthog.capture('lesson_open', { lesson: moduleId, signed_in: !!isSignedIn, gated: !!isGated }) } catch (e) { /* optional */ }
  }, [moduleId, isSignedIn, isGated])

  const isAiModule = module.id === 'ai-module'
  const isPaidModule = !module.free

  return (
    <div className="min-h-screen" style={{ background: '#F4F3E8' }}>

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-30 bg-white" style={{ borderBottom: '1px solid #f0f0f0' }}>
        <div className="flex items-center justify-between px-5 py-3">
          {/* Left: mobile menu + breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-[#EAE8DC] transition-colors flex-shrink-0"
              style={{ color: '#aaa' }}>
              <svg className="w-4.5 h-4.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>

            <nav className="flex items-center gap-1.5 text-xs min-w-0">
              <Link href="/dashboard" className="flex-shrink-0 transition-colors" style={{ color: '#bbb' }}
                onMouseEnter={e => e.currentTarget.style.color = '#2E3250'}
                onMouseLeave={e => e.currentTarget.style.color = '#bbb'}>
                Dashboard
              </Link>
              <span style={{ color: '#ddd' }}>/</span>
              <Link href="/dashboard/modules" className="flex-shrink-0 transition-colors" style={{ color: '#bbb' }}
                onMouseEnter={e => e.currentTarget.style.color = '#2E3250'}
                onMouseLeave={e => e.currentTarget.style.color = '#bbb'}>
                Guides
              </Link>
              <span style={{ color: '#ddd' }}>/</span>
              <span className="font-medium truncate" style={{ color: '#2E3250' }}>{module.title}</span>
            </nav>
          </div>

          {/* Right: progress dots + counter */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-1">
              {COURSE_CATALOG.map((m, i) => (
                <Link key={m.id} href={`/course/${m.id}`} title={m.title}>
                  <span className="block rounded-full transition-all duration-200"
                    style={{
                      width: i === moduleIndex ? 18 : 6,
                      height: 6,
                      background: i === moduleIndex ? '#2E3250' : i < moduleIndex ? '#22c55e' : '#e8e8e8',
                    }} />
                </Link>
              ))}
            </div>
            <span className="text-xs tabular-nums font-medium" style={{ color: '#ccc' }}>
              {moduleIndex + 1} / {COURSE_CATALOG.length}
            </span>
          </div>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="flex">

        {/* Sidebar */}
        <aside className="hidden lg:block flex-shrink-0 sticky"
          style={{ width: 252, top: 45, height: 'calc(100vh - 45px)' }}>
          <ModuleSidebar
            currentIndex={moduleIndex}
            isLoaded
            hasStandard={hasPaid}
            hasPremium={hasPaid}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div style={{ maxWidth: 700, margin: '0 auto', padding: '56px 40px 100px' }}>

            {/* ── Module header — clean, typographic (Anthropic Academy style) ── */}
            <header className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-4" style={{ color: 'rgba(26,26,30,0.45)' }}>
                Guide {module.number}
                {module.free ? ' · Free' : isAiModule ? ' · Premium' : ' · Standard'}
              </p>
              <h1 className="font-serif font-bold mb-6" style={{ color: '#1a1a1e', fontSize: 40, letterSpacing: '-0.02em', lineHeight: 1.12 }}>
                {module.title}
              </h1>
              <div style={{ height: 1, background: 'rgba(26,26,30,0.12)' }} />
            </header>

            {/* ── Content ── */}
            <article>
              <ContentRenderer content={module.content} />
            </article>

            {/* Upsell only at the free→paid boundary (end of the last free guide,
                when the next guide is locked) — never mid-way through free guides. */}
            {nextModule && !nextModule.free && !hasPaid && !isGated && <PostModuleGate />}
            {isGated && <PaywallBanner isPremiumOnly={isAiModule} isSignedIn={isSignedIn} moduleId={module.id} />}

            {/* ── Prev / Next navigation ── */}
            {(!isGated || module.free) && (
              <nav className="mt-20 pt-8" style={{ borderTop: '1px solid #f0f0f0' }}>
                <div className="flex items-stretch gap-3">
                  {prevModule ? (
                    <Link
                      href={`/course/${prevModule.id}`}
                      className="group flex items-center gap-3 px-5 py-4 rounded-xl flex-1 bg-white transition-all"
                      style={{ border: '1px solid #e8e8e8', maxWidth: '48%' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#2E3250'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.boxShadow = 'none' }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#EAE8DC' }}>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="#888">
                          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>
                        <span className="block text-[9px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#ccc' }}>Previous</span>
                        <span className="text-sm font-medium line-clamp-1" style={{ color: '#2E3250', letterSpacing: '-0.01em' }}>{prevModule.title}</span>
                      </span>
                    </Link>
                  ) : <div className="flex-1" style={{ maxWidth: '48%' }} />}

                  {nextModule ? (
                    <Link
                      href={`/course/${nextModule.id}`}
                      className="group flex items-center justify-end gap-3 px-5 py-4 rounded-xl flex-1 text-right transition-all ml-auto"
                      style={{ background: '#2E3250', border: '1px solid #2E3250', maxWidth: '48%', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#2E3250'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)' }}>
                      <span>
                        <span className="block text-[9px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Next up</span>
                        <span className="text-sm font-semibold line-clamp-1" style={{ color: '#fff', letterSpacing: '-0.01em' }}>{nextModule.title}</span>
                      </span>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="rgba(255,255,255,0.8)">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center justify-end flex-1" style={{ maxWidth: '48%' }}>
                      <Link href="/dashboard"
                        className="text-sm font-semibold px-6 py-3 rounded-xl transition-all hover:opacity-90"
                        style={{ background: '#2E3250', color: '#fff' }}>
                        Back to Dashboard
                      </Link>
                    </div>
                  )}
                </div>

                {/* Completion message on last module */}
                {!nextModule && (
                  <p className="text-center text-xs mt-6" style={{ color: '#bbb' }}>
                    You've completed the full curriculum. 🎓
                  </p>
                )}
              </nav>
            )}
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
      <MobileModuleDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentIndex={moduleIndex}
        isLoaded
        hasStandard={hasPaid}
        hasPremium={hasPaid}
      />
    </div>
  )
}
