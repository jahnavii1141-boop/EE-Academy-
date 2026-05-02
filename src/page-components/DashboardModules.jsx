'use client'

import Link from 'next/link'
import { Lock, CheckCircle } from 'lucide-react'
import { useModuleProgress } from '../hooks/useModuleProgress'

const MODULES = [
  { id: 'module-1', num: 1, title: 'The Examiner Lens', description: 'How IB examiners actually read and mark your essay.', free: true },
  { id: 'module-2', num: 2, title: 'Inside the Markscheme', description: 'Break down every criterion. Know exactly what earns marks.', free: true },
  { id: 'module-3', num: 3, title: 'Topic Selection', description: 'Pick a topic that\'s researchable, scoreable, and interesting.', free: true },
  { id: 'module-4', num: 4, title: 'Research Question Design', description: 'Write a focused, analytical RQ that sets your essay up to win.', free: false },
  { id: 'module-5', num: 5, title: 'The EE Dump Method', description: 'A system for gathering sources without drowning in them.', free: true },
  { id: 'module-6', num: 6, title: 'Evidence and Research', description: 'Find, evaluate, and use academic sources properly.', free: false },
  { id: 'module-7', num: 7, title: 'Essay Architecture', description: 'Structure your essay section by section. Map to the criteria.', free: false },
  { id: 'module-8', num: 8, title: 'Analytical Writing', description: 'Stop describing. Start analysing. This is where most marks are lost.', free: false },
  { id: 'module-9', num: 9, title: 'Citations & Formatting', description: 'MLA citations, block quotes, word count, presentation rules.', free: false },
  { id: 'module-10', num: 10, title: 'Openings and Endings', description: 'Write an introduction that hooks. A conclusion that lands.', free: false },
  { id: 'module-11', num: 11, title: 'RPPF & Viva Voce', description: 'Write all three RPPF reflections. Prepare for the viva.', free: false },
  { id: 'ai-module', num: '✦', title: 'AI Prompt Library', description: '12 copy-paste prompts for research, structure, and revision.', free: false },
  { id: 'module-13', num: 13, title: 'The 32/34 Essay Analysis', description: 'Full examiner breakdown of a real 32/34 essay.', free: false },
  { id: 'module-14', num: 14, title: 'Final Checklist & Submission', description: 'Pre-submission checklist. Submit with confidence.', free: false },
]

export default function DashboardModules() {
  const { isVisited } = useModuleProgress()

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-8 pt-8 pb-16">
        <p className="text-[10px] font-bold text-ink-muted uppercase tracking-widest mb-2">Modules</p>
        <h1 className="font-serif text-2xl font-bold text-navy mb-1">Modules</h1>
        <p className="text-sm text-ink-soft mb-8">
          14 modules — the complete EE system. Start with Module 1.
        </p>

        <div className="space-y-2">
          {MODULES.map((mod) => {
            const visited = isVisited(mod.id)
            const card = (
              <div className={`rounded-xl border px-5 py-4 flex items-start gap-4 transition-all duration-150 ${
                mod.free
                  ? 'border-navy/10 bg-white/60 hover:border-navy/25 hover:bg-white cursor-pointer'
                  : 'border-navy/8 bg-white/30 cursor-pointer hover:border-navy/20'
              }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 ${
                  visited ? 'bg-green-100 text-green-700' : 'bg-navy/8 text-navy/60'
                }`}>
                  {visited ? <CheckCircle className="w-4 h-4" /> : mod.num}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-navy leading-snug">{mod.title}</p>
                  <p className="text-xs text-navy/55 mt-0.5 leading-relaxed">{mod.description}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2 mt-0.5">
                  {mod.free && (
                    <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Free</span>
                  )}
                  {!mod.free && <Lock className="w-3.5 h-3.5 text-navy/25" strokeWidth={1.8} />}
                </div>
              </div>
            )

            return (
              <Link key={mod.id} href={`/course/${mod.id}`}>
                {card}
              </Link>
            )
          })}
        </div>

        <div className="mt-8 rounded-xl border border-navy/10 bg-parchment/30 px-5 py-4 flex items-center justify-between gap-4">
          <p className="text-sm text-navy/70">Want all 14 modules unlocked?</p>
          <Link href="/pricing" className="text-xs font-bold text-navy underline underline-offset-2">Get full access →</Link>
        </div>
      </div>
    </div>
  )
}
