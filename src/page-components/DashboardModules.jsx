'use client'

import Link from 'next/link'
import { useModuleProgress } from '../hooks/useModuleProgress'
import { useAccess } from '../hooks/useAccess'
import { COURSE_CATALOG } from '../data/courseCatalog'

// Derived from COURSE_CATALOG — the single source of truth for guide names
// and briefs. Never hardcode a duplicate list here (it drifts on redeploys).
const MODULES = COURSE_CATALOG.map(m => ({
  id: m.id,
  num: m.number,
  title: m.title,
  description: m.tagline,
  free: m.free,
  premium: m.premium,
}))

// Curriculum grouped by ACCESS, not numbered sequence (2026-07): the free
// guides must be abundantly clear, and there's no forced order anymore.
const SECTIONS = [
  { label: 'Free — start with any of these', filter: (m) => m.free,  free: true },
  { label: 'The full system',                filter: (m) => !m.free, free: false },
]

export default function DashboardModules() {
  const { isVisited } = useModuleProgress()
  const { hasStandard, hasPremium } = useAccess()

  const visitedCount = MODULES.filter(m => isVisited(m.id)).length
  const pct = Math.round((visitedCount / MODULES.length) * 100)

  return (
    <div className="min-h-full" style={{ background: '#F4F3E8' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 40px 80px' }}>

        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#bbb' }}>Curriculum</p>
          <div className="flex items-end justify-between">
            <h1 className="font-semibold" style={{ fontSize: 24, color: '#2E3250', letterSpacing: '-0.02em' }}>
              14 Guides
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-1 rounded-full overflow-hidden" style={{ width: 80, background: '#e8e8e8' }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: '#2E3250' }} />
              </div>
              <span className="text-xs tabular-nums" style={{ color: '#aaa' }}>{visitedCount}/14</span>
            </div>
          </div>
          <p className="text-sm mt-1" style={{ color: '#aaa' }}>
            The complete EE system, built from a real 32/34 essay. Five guides are free — open any of them.
          </p>
          <p className="text-[11px] mt-2 leading-relaxed rounded-lg px-3 py-2 inline-block"
            style={{ color: '#6b7280', background: '#EAE8DC' }}>
            Heads up: November 2026 candidates are marked on the current syllabus (out of 34). The new
            syllabus (first assessment 2027) is out of 30. Same criteria logic — the system works for both.
          </p>
        </div>

        {/* Guide sections — grouped by access, no numbered sequence */}
        <div className="space-y-8">
          {SECTIONS.map(section => {
            const mods = MODULES.filter(section.filter)
            const sectionVisited = mods.filter(m => isVisited(m.id)).length
            return (
              <div key={section.label}>
                {/* Section label */}
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: section.free ? '#15803d' : '#bbb' }}>
                    {section.label}
                  </p>
                  <div className="flex-1 h-px" style={{ background: '#f0f0f0' }} />
                  <p className="text-[10px]" style={{ color: '#ddd' }}>{sectionVisited}/{mods.length}</p>
                </div>

                {/* Unlock CTA sits at the TOP of the paid group — impossible to miss */}
                {!section.free && !hasStandard && (
                  <div className="mb-3 flex items-center justify-between gap-4 px-4 py-3 rounded-xl"
                    style={{ background: '#2E3250' }}>
                    <p className="text-xs font-semibold" style={{ color: '#F4F3E8' }}>
                      Unlock everything below — yearly access.
                    </p>
                    <Link href="/pricing"
                      className="text-xs font-semibold px-4 py-2 rounded-lg flex-shrink-0"
                      style={{ background: '#F4F3E8', color: '#2E3250', textDecoration: 'none' }}>
                      Unlock everything →
                    </Link>
                  </div>
                )}

                {/* Guide rows */}
                <div className="space-y-1">
                  {mods.map((mod) => {
                    const visited = isVisited(mod.id)
                    const isLocked = !mod.free && (mod.premium ? !hasPremium : !hasStandard)

                    return (
                      <Link key={mod.id} href={`/course/${mod.id}`}
                        className="group flex items-center gap-4 px-4 py-3 rounded-xl transition-all"
                        style={{ background: '#fff', border: '1px solid transparent', opacity: 1 }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.background = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = '#fff' }}>

                        {/* Status dot — no numbering */}
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                          style={{ background: visited ? '#2E3250' : '#EAE8DC' }}>
                          {visited ? (
                            <svg width="13" height="13" viewBox="0 0 20 20" fill="white">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="w-2 h-2 rounded-full" style={{ background: mod.free ? '#15803d' : '#c9c5b4' }} />
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-snug" style={{ color: '#2E3250', letterSpacing: '-0.01em' }}>
                            {mod.title}
                          </p>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#aaa' }}>
                            {mod.description}
                          </p>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {mod.free && (
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                              style={{ background: '#15803d', color: '#fff' }}>
                              FREE
                            </span>
                          )}
                          {mod.premium && !mod.free && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: '#faf5ff', color: '#7c3aed', border: '1px solid #e9d5ff' }}>
                              Premium
                            </span>
                          )}
                          {isLocked && (
                            <svg width="13" height="13" viewBox="0 0 20 20" fill="#ccc">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          {!isLocked && (
                            <svg width="13" height="13" viewBox="0 0 20 20" fill="#ccc" className="group-hover:fill-[#2E3250] transition-colors">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Upgrade CTA */}
        {!hasStandard && (
          <div className="mt-10 flex items-center justify-between gap-6 px-6 py-5 rounded-xl"
            style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
            <div>
              <p className="text-sm font-medium mb-0.5" style={{ color: '#2E3250' }}>Unlock all 14 guides</p>
              <p className="text-xs" style={{ color: '#aaa' }}>Yearly access. 30-day guarantee.</p>
            </div>
            <Link href="/pricing"
              className="text-xs font-semibold px-4 py-2 rounded-lg flex-shrink-0 transition-all"
              style={{ background: '#2E3250', color: '#fff' }}>
              View plans →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
