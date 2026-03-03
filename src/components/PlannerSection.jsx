import AnimateIn from './ui/AnimateIn'
import EEPlanner from './EEPlanner'

const PHASES = [
  { label: 'Research', color: '#6366f1' },
  { label: 'Structure', color: '#8b5cf6' },
  { label: 'Writing', color: '#ec4899' },
  { label: 'Review', color: '#f59e0b' },
  { label: 'Submit', color: '#10b981' },
]

const STATS = [
  { value: '16', label: 'Milestones' },
  { value: '28', label: 'Weeks mapped' },
  { value: '∞', label: 'Custom deadlines' },
]

export default function PlannerSection() {
  return (
    <section id="planner" className="bg-navy py-20 px-6 relative overflow-hidden">
      {/* Subtle radial glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(99,102,241,0.07) 0%, transparent 60%)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimateIn>
          {/* Section label */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-xs font-semibold text-cream/40 uppercase tracking-[0.15em]">Free Tool</span>
          </div>

          <h2 className="section-heading-light">Your EE, on a timeline</h2>
          <p className="section-subheading-light max-w-2xl">
            Enter your submission deadline and instantly get a personalised 28-week roadmap — every milestone auto-calculated, in order.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mb-8">
            {STATS.map(s => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-cream">{s.value}</span>
                <span className="text-sm text-steel">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Phase strip */}
          <div className="flex items-center gap-1 mb-10">
            {PHASES.map((p, i) => (
              <div key={p.label} className="flex items-center gap-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
                  {p.label}
                </div>
                {i < PHASES.length - 1 && (
                  <svg className="w-3 h-3 text-cream/20 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Planner widget — contained in a subtle card */}
        <AnimateIn delay={0.15}>
          <div className="rounded-2xl border border-cream/8 bg-cream/[0.03] p-6 lg:p-10">
            <EEPlanner />
          </div>
        </AnimateIn>

        {/* Tip */}
        <AnimateIn delay={0.2}>
          <p className="mt-6 text-xs text-steel/60 text-center">
            Your progress saves in your browser. Add your own deadlines — college apps, exams, or personal milestones.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
