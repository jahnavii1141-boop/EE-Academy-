import { Link } from 'react-router-dom'
import AnimateIn from './ui/AnimateIn'

const RESULTS = [
  { jump: 'IB 4 -> 6', time: 'in 2 weeks' },
  { jump: 'IB 5 -> 7', time: 'in 1 week' },
  { jump: 'IB 3 -> 6', time: 'in 3 weeks' },
]

export default function ResultsStrip() {
  return (
    <section className="bg-navy py-10 px-6 border-y border-cream/10">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-parchment/70 mb-2">
                Real Student Outcomes
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-cream font-bold">
                Grade jumps with a clear system
              </h2>
            </div>
            <p className="text-sm text-steel max-w-lg">
              Structured lessons, criteria-first writing, and practical templates built for IB Extended Essay success.
            </p>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {RESULTS.map((r, i) => (
            <AnimateIn key={i} delay={0.05 * (i + 1)}>
              <div className="rounded-xl border border-cream/15 bg-cream/5 px-4 py-4">
                <p className="text-lg font-semibold text-cream">{r.jump}</p>
                <p className="text-xs text-steel mt-1">{r.time}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.15}>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/course/module-1" className="btn-primary-light text-sm">
              Start Free Module
            </Link>
            <Link to="/pricing" className="btn-outline-light text-sm">
              Get Full Access
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
