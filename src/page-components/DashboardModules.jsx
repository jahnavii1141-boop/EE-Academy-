'use client'

import Link from 'next/link'
import { useModuleProgress } from '../hooks/useModuleProgress'
import { useAccess } from '../hooks/useAccess'

const MODULES = [
  { id: 'module-1',  num: 1,   title: 'The Examiner Lens',           description: 'How IB examiners actually read and mark your essay.',                    free: true },
  { id: 'module-2',  num: 2,   title: 'Inside the Markscheme',       description: 'Break down every criterion. Know exactly what earns marks.',              free: true },
  { id: 'module-3',  num: 3,   title: 'Topic Selection',             description: 'Pick a topic that\'s researchable, scoreable, and interesting.',          free: true },
  { id: 'module-4',  num: 4,   title: 'Research Question Design',    description: 'Write a focused, analytical RQ that sets your essay up to win.',          free: false },
  { id: 'module-5',  num: 5,   title: 'The EE Dump Method',          description: 'A system for gathering sources without drowning in them.',                free: true },
  { id: 'module-6',  num: 6,   title: 'Evidence and Research',       description: 'Find, evaluate, and use academic sources properly.',                      free: false },
  { id: 'module-7',  num: 7,   title: 'Essay Architecture',          description: 'Structure your essay section by section. Map to the criteria.',           free: false },
  { id: 'module-8',  num: 8,   title: 'Analytical Writing',          description: 'Stop describing. Start analysing. This is where most marks are lost.',   free: false },
  { id: 'module-9',  num: 9,   title: 'Citations & Formatting',      description: 'MLA citations, block quotes, word count, presentation rules.',            free: false },
  { id: 'module-10', num: 10,  title: 'Openings and Endings',        description: 'Write an introduction that hooks. A conclusion that lands.',              free: false },
  { id: 'module-11', num: 11,  title: 'RPPF & Viva Voce',           description: 'Write all three RPPF reflections. Prepare for the viva.',                 free: false },
  { id: 'ai-module', num: '✦', title: 'AI Prompt Library',          description: '12 copy-paste prompts for research, structure, and revision.',            free: false, premium: true },
  { id: 'module-13', num: 13,  title: 'The 32/34 Essay Analysis',   description: 'Full examiner breakdown of a real 32/34 essay.',                          free: false },
  { id: 'module-14', num: 14,  title: 'Final Checklist & Submission', description: 'Pre-submission checklist. Submit with confidence.',                     free: false },
]

const SECTIONS = [
  { label: 'Foundation', range: [0, 2] },
  { label: 'Research',   range: [3, 5] },
  { label: 'Writing',    range: [6, 10] },
  { label: 'Advanced',   range: [11, 13] },
]

export default function DashboardModules() {
  const { isVisited } = useModuleProgress()
  const { hasStandard, hasPremium } = useAccess()

  const visitedCount = MODULES.filter(m => isVisited(m.id)).length
  const pct = Math.round((visitedCount / MODULES.length) * 100)

  return (
    <div className="min-h-full" style={{ background: '#fafafa' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 40px 80px' }}>

        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#bbb' }}>Curriculum</p>
          <div className="flex items-end justify-between">
            <h1 className="font-semibold" style={{ fontSize: 24, color: '#0a0a0a', letterSpacing: '-0.02em' }}>
              14 Modules
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-1 rounded-full overflow-hidden" style={{ width: 80, background: '#e8e8e8' }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: '#0a0a0a' }} />
              </div>
              <span className="text-xs tabular-nums" style={{ color: '#aaa' }}>{visitedCount}/14</span>
            </div>
          </div>
          <p className="text-sm mt-1" style={{ color: '#aaa' }}>
            The complete EE system, built by a 32/34 student. Start with Module 1.
          </p>
        </div>

        {/* Module sections */}
        <div className="space-y-8">
          {SECTIONS.map(section => {
            const mods = MODULES.slice(section.range[0], section.range[1] + 1)
            const sectionVisited = mods.filter(m => isVisited(m.id)).length
            return (
              <div key={section.label}>
                {/* Section label */}
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#bbb' }}>
                    {section.label}
                  </p>
                  <div className="flex-1 h-px" style={{ background: '#f0f0f0' }} />
                  <p className="text-[10px]" style={{ color: '#ddd' }}>{sectionVisited}/{mods.length}</p>
                </div>

                {/* Module rows */}
                <div className="space-y-1">
                  {mods.map((mod) => {
                    const visited = isVisited(mod.id)
                    const isLocked = !mod.free && (mod.premium ? !hasPremium : !hasStandard)

                    return (
                      <Link key={mod.id} href={`/course/${mod.id}`}
                        className="group flex items-center gap-4 px-4 py-3 rounded-xl transition-all"
                        style={{ background: '#fff', border: '1px solid transparent' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.background = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = '#fff' }}>

                        {/* Number / status */}
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-semibold transition-all"
                          style={{
                            background: visited ? '#0a0a0a' : '#f5f5f5',
                            color: visited ? '#fff' : '#aaa',
                          }}>
                          {visited ? (
                            <svg width="13" height="13" viewBox="0 0 20 20" fill="white">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : mod.num}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-snug" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>
                            {mod.title}
                          </p>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#aaa' }}>
                            {mod.description}
                          </p>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {mod.free && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                              Free
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
                            <svg width="13" height="13" viewBox="0 0 20 20" fill="#ccc" className="group-hover:fill-[#0a0a0a] transition-colors">
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
              <p className="text-sm font-medium mb-0.5" style={{ color: '#0a0a0a' }}>Unlock all 14 modules</p>
              <p className="text-xs" style={{ color: '#aaa' }}>One-time payment. Lifetime access. 30-day guarantee.</p>
            </div>
            <Link href="/pricing"
              className="text-xs font-semibold px-4 py-2 rounded-lg flex-shrink-0 transition-all"
              style={{ background: '#0a0a0a', color: '#fff' }}>
              View plans →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
