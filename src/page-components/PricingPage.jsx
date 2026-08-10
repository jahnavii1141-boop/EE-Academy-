'use client'

import { useState } from 'react'
import Link from 'next/link'
import AnimateIn from '../components/ui/AnimateIn'
import Pricing from '../components/Pricing'
import SEOHead from '../components/SEOHead'

// ── Three pillars comparison ─────────────────────────────────────────────────
const COMPARISON = [
  // [label, standard, premium]
  ['14-lesson EE curriculum',            true,  true],
  ['EE Planner + RQ Checker',            true,  true],
  ['Essay editor (autosave + share)',     true,  true],
  ['Citation generator',                  true,  true],
  ['Polish Pass + Supervisor Reply tool', false, true],
  ['32/34 essay + full analysis',         false, true],
  ['All templates & SOPs',               false, true],
]

// ── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: 'Can I try before buying?',
    a: 'Yes — your first lessons are included. Start at the dashboard and access them immediately.',
  },
  {
    q: "What's the difference between Standard and Premium?",
    a: 'Standard is the full 14-lesson curriculum plus planning and writing tools. Premium adds the Polish Pass, the Supervisor Reply Drafter, and all downloadable templates.',
  },
  {
    q: "What if it doesn't help me?",
    a: 'You have 30 days to request a full refund. Go through the lessons — if the system genuinely doesn\'t help you, email us and we\'ll sort it same day, no forms.',
  },
  {
    q: 'Is this a subscription?',
    a: 'Access is yearly — a full year of the complete system.',
  },
  {
    q: 'Is this up to date with the current IB syllabus?',
    a: 'Yes. The curriculum reflects the current IB Extended Essay guide and assessment criteria. The 32/34 essay analysed in Guide 13 was submitted in May 2025.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-navy/8 last:border-0">
      <button onClick={() => setOpen(o => !o)}
        className="w-full text-left py-4 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-navy">{q}</span>
        <span className="text-navy/40 flex-shrink-0 text-lg leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="text-sm text-ink-soft leading-relaxed pb-4">{a}</p>}
    </div>
  )
}

function Tick({ yes, hero }) {
  if (!yes) return <span style={{ color: '#ddd' }}>—</span>
  return (
    <svg className="w-4 h-4 inline" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill={hero ? '#0a0a0a' : '#0a0a0a'} fillOpacity={hero ? 1 : 0.08} />
      <path d="M5 8l2 2 4-4" stroke={hero ? '#fff' : '#0a0a0a'}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title="IB Extended Essay Course Pricing — Standard & Premium | EE Academy"
        description="Two tiers, one system. Standard $79 · Premium $149 — yearly access. Built from a real 32/34 Extended Essay. 30-day money-back guarantee."
        canonical="/pricing"
      />

      {/* ── Hero ── */}
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-4 text-center">
        <AnimateIn>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-4">
            Pick the help you want.
          </h1>
          <p className="text-lg text-ink-soft max-w-xl mx-auto">
            The same 14-module system at every tier — choose how much support you want on top of it.
            Start today, unlock when you're ready.
          </p>
        </AnimateIn>
      </div>

      {/* ── Grade Promise (only conversion element above the fold) ── */}
      <div className="max-w-2xl mx-auto px-6 pt-4 pb-2">
        <AnimateIn>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-bold text-emerald-800 mb-0.5">30-Day Money-Back Guarantee</p>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Go through the modules. If you don't find the system genuinely useful, email us within 30 days — full refund, no forms, no questions.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* ── 3-column pricing grid ── */}
      <Pricing />

      {/* ── What's included comparison ── */}
      <div className="max-w-3xl mx-auto px-6 pb-10">
        <AnimateIn>
          <h2 className="font-serif text-xl font-bold text-navy mb-4">What's included</h2>
          <div className="rounded-2xl border border-navy/10 bg-white overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 text-[11px] font-semibold uppercase tracking-widest
              px-5 py-3 border-b border-navy/8" style={{ color: '#aaa', background: '#fafafa' }}>
              <span className="col-span-1" />
              <span className="text-center">Standard</span>
              <span className="text-center" style={{ color: '#0a0a0a' }}>Premium</span>
            </div>
            {COMPARISON.map(([label, standard, premium], i) => (
              <div key={i} className="grid grid-cols-3 px-5 py-3 border-b border-navy/6 last:border-0 text-sm items-center">
                <span className="text-navy/80 col-span-1 pr-4">{label}</span>
                <span className="text-center"><Tick yes={standard} /></span>
                <span className="text-center"><Tick yes={premium} hero /></span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <AnimateIn>
          <h2 className="font-serif text-2xl font-bold text-navy mb-6">Common questions</h2>
          <div className="rounded-2xl border border-navy/10 bg-white/60 px-6">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
          <p className="text-center text-sm text-ink-soft mt-6">
            Still unsure?{' '}
            <Link href="/course/module-1" className="text-navy font-medium underline underline-offset-2">
              Start with the included modules first →
            </Link>
          </p>
        </AnimateIn>
      </div>
    </div>
  )
}
