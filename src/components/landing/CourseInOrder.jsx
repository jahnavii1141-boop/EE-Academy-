import Link from 'next/link'
import { COURSE_CATALOG } from '@/data/courseCatalog'

// The course, in order — the real lesson list. Open (free) lessons are links;
// locked lessons are still listed with their real title + one-line brief, just
// greyed (grey reads as "later"; a lock icon reads as "wall"). Reuses the same
// Foundation/Research/Writing/Advanced grouping as the in-course sidebar.
const STAGES = [
  { label: 'Foundation', ids: ['module-1', 'module-2', 'module-3'] },
  { label: 'Research', ids: ['module-4', 'module-5', 'module-6'] },
  { label: 'Writing', ids: ['module-7', 'module-8', 'module-9', 'module-10', 'module-11'] },
  { label: 'Advanced', ids: ['ai-module', 'module-13', 'module-14'] },
]

export default function CourseInOrder() {
  return (
    <section className="bg-cream px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-2">The course, in order</h2>
        <p className="text-ink-soft mb-12">Click any open lesson to read it now.</p>

        <div className="space-y-10">
          {STAGES.map((stage) => {
            const mods = stage.ids.map((id) => COURSE_CATALOG.find((m) => m.id === id)).filter(Boolean)
            return (
              <div key={stage.label}>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy/40 mb-3">{stage.label}</p>
                <ul className="rounded-2xl border border-navy/10 bg-white overflow-hidden">
                  {mods.map((m, i) => (
                    <li key={m.id} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(46,50,80,0.07)' }}>
                      <Link
                        href={`/course/${m.id}`}
                        className="flex items-baseline gap-4 px-5 py-4 transition-colors hover:bg-parchment/30"
                      >
                        <span className="text-sm tabular-nums font-semibold flex-shrink-0" style={{ color: m.free ? '#2E3250' : '#c9c5b4' }}>
                          {m.number}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[15px] font-semibold leading-snug" style={{ color: m.free ? '#2E3250' : '#9BAAB8' }}>
                            {m.title}
                          </span>
                          <span className="block text-[13px] leading-snug mt-0.5" style={{ color: m.free ? '#6b7280' : '#b8bcc4' }}>
                            {m.tagline}
                          </span>
                        </span>
                        {m.free && (
                          <span className="text-[10px] font-bold tracking-wide flex-shrink-0 mt-0.5" style={{ color: '#15803d' }}>OPEN</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <p className="text-sm text-ink-soft mt-10">
          14 lessons · a real 32/34 example essay you can open.
        </p>
      </div>
    </section>
  )
}
