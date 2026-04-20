import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnimateIn from '../components/ui/AnimateIn'
import Pricing from '../components/Pricing'
import SEOHead from '../components/SEOHead'

const FAQ_ITEMS = [
  {
    q: 'Is there a free option?',
    a: 'Yes — Modules 1, 2, 3, and 5 are completely free with no card required. Start at the dashboard and access them immediately.',
  },
  {
    q: "What's the difference between Basic and Premium?",
    a: 'Basic gives you all 14 course modules, the Study Calendar, and the Citation guide. Premium adds the interactive EE Dump Workspace, EE Planner, Source Tracker, all 12 AI copy-paste prompts, the full 32/34 essay analysis, and all downloadable templates.',
  },
  {
    q: "What if it doesn't help me?",
    a: "You have 30 days to request a full refund, no questions asked. If you go through the modules and feel it wasn't worth it, email us and we'll sort it immediately.",
  },
  {
    q: 'Is this up to date with the current IB syllabus?',
    a: 'Yes. The curriculum reflects the current IB Extended Essay guide and assessment criteria. The 32/34 essay analysed in Module 13 was submitted in May 2025.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-navy/8 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left py-4 flex items-center justify-between gap-4"
      >
        <span className="text-sm font-semibold text-navy">{q}</span>
        <span className="text-navy/40 flex-shrink-0 text-lg leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p className="text-sm text-ink-soft leading-relaxed pb-4">{a}</p>
      )}
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title="IB Extended Essay Course Pricing — 14-Module System | The Extended Essay Academy"
        description="One-time access to the complete IB Extended Essay self-study system. 14 modules, interactive tools, 32/34 essay analysis, and a 30-day money-back guarantee."
        canonical="/pricing"
      />

      <div className="max-w-4xl mx-auto px-6 pt-16 pb-2 text-center">
        <AnimateIn>
          <span className="inline-flex items-center bg-navy/8 text-navy text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-navy/12 tracking-wide">
            One-time payment · Lifetime access
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-3">
            Get Full Access
          </h1>
          <p className="text-lg text-ink-soft max-w-xl mx-auto">
            The complete IB Extended Essay self-study system — built by a 32/34 Cambridge graduate. Start free, unlock everything when you're ready.
          </p>
        </AnimateIn>
      </div>

      <Pricing />

      {/* Guarantee */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <AnimateIn>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-800 mb-1">30-Day Money-Back Guarantee</p>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Go through the modules. If you don't find the system genuinely useful, email us within 30 days for a full refund — no forms, no questions.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* What's included comparison */}
      <div className="max-w-2xl mx-auto px-6 pb-8">
        <AnimateIn>
          <div className="rounded-2xl border border-navy/10 bg-white/60 overflow-hidden">
            <div className="grid grid-cols-3 text-xs font-semibold text-navy/50 uppercase tracking-widest px-5 py-3 border-b border-navy/8 bg-navy/[0.03]">
              <span>What's included</span>
              <span className="text-center">Basic</span>
              <span className="text-center">Premium</span>
            </div>
            {[
              ['All 14 course modules', true, true],
              ['Study Calendar tool', true, true],
              ['Citation quick-reference', true, true],
              ['EE Dump Workspace', false, true],
              ['EE Planner (timeline tool)', false, true],
              ['12 AI copy-paste prompts', false, true],
              ['32/34 essay + full analysis', false, true],
              ['All templates & SOPs', false, true],
            ].map(([label, basic, premium], i) => (
              <div key={i} className="grid grid-cols-3 px-5 py-3 border-b border-navy/6 last:border-0 text-sm">
                <span className="text-navy/80">{label}</span>
                <span className="text-center text-navy">{basic ? '✓' : <span className="text-navy/20">—</span>}</span>
                <span className="text-center text-navy">{premium ? '✓' : <span className="text-navy/20">—</span>}</span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto px-6 pb-16">
        <AnimateIn>
          <h2 className="font-serif text-2xl font-bold text-navy mb-6">Common questions</h2>
          <div className="rounded-2xl border border-navy/10 bg-white/60 px-6">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
          <p className="text-center text-sm text-ink-soft mt-6">
            Still unsure?{' '}
            <Link to="/course/module-1" className="text-navy font-medium underline underline-offset-2">
              Start with the free modules first →
            </Link>
          </p>
        </AnimateIn>
      </div>
    </div>
  )
}
