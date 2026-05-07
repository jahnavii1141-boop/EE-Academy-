'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth, SignInButton } from '@clerk/nextjs'
import { COURSE_MODULES } from '../data/courseContent'
import { useModuleProgress } from '../hooks/useModuleProgress'
import { useAccess } from '../hooks/useAccess'
import ContentRenderer from '../components/blocks/ContentRenderer'
import PostModuleGate from '../components/PostModuleGate'

function ModuleSidebar({ currentIndex, isLoaded, hasStandard, hasPremium }) {
  const { isVisited } = useModuleProgress()
  const visitedCount = COURSE_MODULES.filter(m => isVisited(m.id)).length
  const pct = Math.round((visitedCount / COURSE_MODULES.length) * 100)

  const SECTIONS = [
    { label: 'Foundation', ids: ['module-1', 'module-2', 'module-3'] },
    { label: 'Research',   ids: ['module-4', 'module-5', 'module-6'] },
    { label: 'Writing',    ids: ['module-7', 'module-8', 'module-9', 'module-10', 'module-11'] },
    { label: 'Advanced',   ids: ['ai-module', 'module-13', 'module-14'] },
  ]

  return (
    <nav className="flex flex-col h-full" style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
      {/* Header */}
      <div className="px-4 pt-5 pb-4" style={{ borderBottom: '1px solid #f5f5f5' }}>
        <Link href="/dashboard/modules" className="flex items-center gap-1.5 text-xs mb-3 transition-colors"
          style={{ color: '#aaa' }}
          onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
          onMouseLeave={e => e.currentTarget.style.color = '#aaa'}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          All modules
        </Link>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#ccc' }}>Progress</span>
          <span className="text-[10px] tabular-nums" style={{ color: '#ccc' }}>{visitedCount}/{COURSE_MODULES.length}</span>
        </div>
        <div className="h-1 rounded-full" style={{ background: '#f0f0f0' }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: '#0a0a0a' }} />
        </div>
      </div>

      {/* Module list */}
      <div className="flex-1 overflow-y-auto py-3 px-2">
        {SECTIONS.map(section => {
          const mods = COURSE_MODULES.filter(m => section.ids.includes(m.id))
          return (
            <div key={section.label} className="mb-4">
              <p className="text-[9px] font-semibold uppercase tracking-widest px-2 mb-1.5" style={{ color: '#ccc' }}>
                {section.label}
              </p>
              {mods.map((m) => {
                const idx = COURSE_MODULES.findIndex(mod => mod.id === m.id)
                const isCurrent = idx === currentIndex
                const visited = isVisited(m.id)
                const isAi = m.id === 'ai-module'
                const isLocked = isLoaded && !m.free && (isAi ? !hasPremium : !hasStandard)

                return (
                  <Link
                    key={m.id}
                    href={`/course/${m.id}`}
                    className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-all mb-0.5"
                    style={{
                      background: isCurrent ? '#f5f5f5' : 'transparent',
                      color: isCurrent ? '#0a0a0a' : '#888',
                    }}
                    onMouseEnter={e => { if (!isCurrent) { e.currentTarget.style.background = '#fafafa'; e.currentTarget.style.color = '#0a0a0a' } }}
                    onMouseLeave={e => { if (!isCurrent) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#888' } }}>

                    {/* Status icon */}
                    <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                      {visited && !isCurrent ? (
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="#16a34a">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : isCurrent ? (
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#0a0a0a' }} />
                      ) : isLocked ? (
                        <svg width="11" height="11" viewBox="0 0 20 20" fill="#ddd">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="w-1 h-1 rounded-full" style={{ background: '#ddd' }} />
                      )}
                    </span>

                    <span className="text-xs leading-snug truncate" style={{ fontWeight: isCurrent ? 500 : 400 }}>
                      <span className="mr-1" style={{ color: '#ccc', fontVariantNumeric: 'tabular-nums' }}>{m.number}.</span>
                      {m.title}
                    </span>
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

function MobileModuleDrawer({ isOpen, onClose, currentIndex, isLoaded, hasStandard, hasPremium }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.3)' }} onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 shadow-xl overflow-hidden" style={{ background: '#fff' }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <span className="text-sm font-semibold" style={{ color: '#0a0a0a' }}>Modules</span>
          <button onClick={onClose} className="p-1" style={{ color: '#aaa' }}>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
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

function PaywallBanner({ isPremiumOnly }) {
  const { isSignedIn } = useAuth()
  return (
    <div className="relative mt-2 mb-8">
      <div className="absolute -top-24 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #fafafa)' }} />
      <div className="relative z-20 rounded-2xl p-10 text-center"
        style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-5"
          style={{ background: '#f5f5f5' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h3 className="font-semibold mb-2" style={{ fontSize: 18, color: '#0a0a0a', letterSpacing: '-0.02em' }}>
          {isPremiumOnly ? 'Premium module' : 'Unlock the full curriculum'}
        </h3>
        <p className="text-sm max-w-xs mx-auto mb-7 leading-relaxed" style={{ color: '#aaa' }}>
          {isPremiumOnly
            ? 'This module is included in the Premium plan.'
            : 'Enroll in Standard or Premium to unlock all 14 modules.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
                style={{ background: '#f5f5f5', color: '#0a0a0a', border: '1px solid #e8e8e8' }}>
                Sign in
              </button>
            </SignInButton>
          )}
          <Link href="/pricing"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
            style={{ background: '#0a0a0a', color: '#fff' }}>
            {isPremiumOnly ? 'Upgrade to Premium →' : 'View plans →'}
          </Link>
        </div>
        <p className="text-xs mt-5" style={{ color: '#ccc' }}>30-day money-back guarantee · Lifetime access</p>
      </div>
    </div>
  )
}

export default function CourseModulePage() {
  const params = useParams()
  const moduleId = params.moduleId
  const { isLoaded } = useAuth()
  const { hasStandard, hasPremium, loading: accessLoading } = useAccess()
  const { markVisited } = useModuleProgress()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const moduleIndex = COURSE_MODULES.findIndex(m => m.id === moduleId)
  const module = COURSE_MODULES[moduleIndex]
  const prevModule = COURSE_MODULES[moduleIndex - 1]
  const nextModule = COURSE_MODULES[moduleIndex + 1]

  useEffect(() => {
    if (module) markVisited(module.id)
  }, [module?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setDrawerOpen(false) // eslint-disable-line react-hooks/set-state-in-effect
  }, [moduleId])

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#fafafa' }}>
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: '#aaa' }}>Module not found.</p>
          <Link href="/dashboard/modules"
            className="text-sm font-medium px-4 py-2 rounded-lg"
            style={{ background: '#0a0a0a', color: '#fff' }}>
            Back to modules
          </Link>
        </div>
      </div>
    )
  }

  const isAiModule = module.id === 'ai-module'
  const isPaidModule = !module.free

  let isGated = false
  if (isAiModule) {
    isGated = isLoaded && !accessLoading && !hasPremium
  } else if (isPaidModule) {
    isGated = isLoaded && !accessLoading && !hasStandard
  }
  if (!isLoaded || accessLoading) isGated = false

  const visibleContent = isGated ? module.content.slice(0, 3) : module.content

  return (
    <div className="min-h-screen" style={{ background: '#fafafa' }}>

      {/* Top bar */}
      <div className="sticky top-0 z-30" style={{ background: 'rgba(250,250,250,0.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #f0f0f0' }}>
        <div className="flex items-center justify-between px-6 py-3" style={{ maxWidth: '100%' }}>
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <button onClick={() => setDrawerOpen(true)} className="lg:hidden p-1" style={{ color: '#aaa' }}>
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs" style={{ color: '#bbb' }}>
              <Link href="/dashboard" style={{ color: '#bbb' }}
                onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
                onMouseLeave={e => e.currentTarget.style.color = '#bbb'}>
                Dashboard
              </Link>
              <span>/</span>
              <Link href="/dashboard/modules" style={{ color: '#bbb' }}
                onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
                onMouseLeave={e => e.currentTarget.style.color = '#bbb'}>
                Modules
              </Link>
              <span>/</span>
              <span style={{ color: '#0a0a0a', fontWeight: 500 }}>{module.title}</span>
            </div>
          </div>

          {/* Progress dots — desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {COURSE_MODULES.map((m, i) => (
              <Link key={m.id} href={`/course/${m.id}`}>
                <span title={m.title} className="block rounded-full transition-all"
                  style={{
                    width: i === moduleIndex ? 16 : 6,
                    height: 6,
                    background: i === moduleIndex ? '#0a0a0a' : i < moduleIndex ? '#ccc' : '#e8e8e8',
                  }} />
              </Link>
            ))}
          </div>

          <span className="text-xs tabular-nums" style={{ color: '#ccc' }}>
            {moduleIndex + 1} / {COURSE_MODULES.length}
          </span>
        </div>
      </div>

      <div className="flex" style={{ maxWidth: '100%' }}>

        {/* Sidebar */}
        <aside className="hidden lg:block flex-shrink-0 sticky"
          style={{ width: 240, top: 45, height: 'calc(100vh - 45px)' }}>
          <ModuleSidebar currentIndex={moduleIndex} isLoaded={isLoaded} hasStandard={hasStandard} hasPremium={hasPremium} />
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <div style={{ maxWidth: 680, margin: '0 auto', padding: '52px 40px 80px' }}>

            {/* Module header */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#bbb' }}>
                  Module {module.number}
                </span>
                {module.free && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                    Free
                  </span>
                )}
                {isAiModule && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: '#faf5ff', color: '#7c3aed', border: '1px solid #e9d5ff' }}>
                    Premium
                  </span>
                )}
                {isPaidModule && !isAiModule && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: '#f5f5f5', color: '#888', border: '1px solid #e8e8e8' }}>
                    Standard
                  </span>
                )}
              </div>

              <h1 className="font-semibold leading-tight mb-3"
                style={{ fontSize: 28, color: '#0a0a0a', letterSpacing: '-0.03em' }}>
                {module.title}
              </h1>
              <p className="text-base leading-relaxed" style={{ color: '#888' }}>{module.tagline}</p>

              <div className="mt-8" style={{ height: 1, background: '#f0f0f0' }} />
            </div>

            {/* Content */}
            <article className="prose-ee">
              <ContentRenderer content={visibleContent} />
            </article>

            {module.id === 'module-2' && !isGated && <PostModuleGate />}
            {isGated && <PaywallBanner isPremiumOnly={isAiModule} />}

            {isPaidModule && (!isLoaded || accessLoading) && (
              <div className="flex justify-center py-12">
                <div className="w-5 h-5 rounded-full border-2 border-t-transparent"
                  style={{ borderColor: '#e8e8e8', borderTopColor: '#0a0a0a', animation: 'spin 0.8s linear infinite' }} />
              </div>
            )}

            {/* Prev / Next */}
            {(!isGated || module.free) && (
              <div className="flex items-stretch justify-between gap-4 mt-16 pt-8"
                style={{ borderTop: '1px solid #f0f0f0' }}>
                {prevModule ? (
                  <Link href={`/course/${prevModule.id}`}
                    className="group flex items-center gap-3 px-5 py-4 rounded-xl flex-1 transition-all"
                    style={{ background: '#fff', border: '1px solid #e8e8e8', maxWidth: '48%' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#0a0a0a'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#e8e8e8'}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="#bbb">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    <span>
                      <span className="block text-[9px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#ccc' }}>Previous</span>
                      <span className="text-sm font-medium line-clamp-1" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>{prevModule.title}</span>
                    </span>
                  </Link>
                ) : <div className="flex-1" style={{ maxWidth: '48%' }} />}

                {nextModule ? (
                  <Link href={`/course/${nextModule.id}`}
                    className="group flex items-center justify-end gap-3 px-5 py-4 rounded-xl flex-1 text-right transition-all"
                    style={{ background: '#0a0a0a', border: '1px solid #0a0a0a', maxWidth: '48%' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#222'}
                    onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}>
                    <span>
                      <span className="block text-[9px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Next</span>
                      <span className="text-sm font-medium line-clamp-1" style={{ color: '#fff', letterSpacing: '-0.01em' }}>{nextModule.title}</span>
                    </span>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="rgba(255,255,255,0.4)">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                ) : (
                  <div className="flex items-center justify-end flex-1" style={{ maxWidth: '48%' }}>
                    <Link href="/dashboard"
                      className="text-sm font-semibold px-5 py-2.5 rounded-xl"
                      style={{ background: '#0a0a0a', color: '#fff' }}>
                      Back to Dashboard
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <MobileModuleDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}
        currentIndex={moduleIndex} isLoaded={isLoaded} hasStandard={hasStandard} hasPremium={hasPremium} />
    </div>
  )
}
