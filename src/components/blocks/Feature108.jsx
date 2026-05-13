'use client'

import { useState } from 'react'
import Link from 'next/link'
import AnimateIn from '../ui/AnimateIn'

// ── Three pillars — every feature on the site lives under one of these ───────
const PILLARS = [
  {
    id: 'plan',
    label: 'The Plan',
    tag: 'Know what to do next',
    headline: 'From blank page to structured draft — week by week.',
    body: 'The Plan turns a vague deadline into a clear path. 14 modules build the system. The RQ Checker stops you investing weeks in a question that won\'t score. The EE Planner breaks it into weekly targets so you\'re never drifting.',
    features: ['14-module curriculum', 'Research Question Checker', 'EE Planner (week-by-week)', 'Essay editor with autosave'],
    cta: { label: 'Start Module 1 free', href: '/course/module-1' },
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    imageAlt: 'Student working on essay at desk',
  },
  {
    id: 'scan',
    label: 'The Grade Scan',
    tag: 'Catch what your supervisor will',
    headline: 'AI reads your draft the way an examiner does.',
    body: 'The Grade Scan runs your essay against the actual IB criteria — not general feedback, but criterion-by-criterion analysis telling you exactly where marks are being dropped and what to fix. The Polish Pass handles language. The Supervisor Reply Drafter handles the awkward email.',
    features: ['AI Grade Scan (criteria-by-criteria)', 'Polish Pass — argument + language', 'Supervisor Reply Drafter', '32/34 essay full breakdown'],
    cta: { label: 'See Method+AI', href: '/pricing' },
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    imageAlt: 'Graded paper with annotations',
  },
  {
    id: 'save',
    label: 'The Save',
    tag: 'Before you submit',
    headline: 'Everything you need to not lose marks on the small stuff.',
    body: 'Citations wrong. Abstract unclear. Structure technically fine but analytically weak. The Save is the final-pass layer: share your draft with your supervisor directly from the editor, run the citation generator, and use the 32/34 essay breakdown to gut-check your own argument before it leaves your hands.',
    features: ['Share with supervisor (live link)', 'Citation generator + bibliography', '32/34 essay as benchmark', 'All SOPs & submission checklist'],
    cta: { label: 'See full system', href: '/pricing' },
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    imageAlt: 'Library research and writing',
  },
]

function Check() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-navy" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.1" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Feature108() {
  const [active, setActive] = useState('plan')
  const pillar = PILLARS.find(p => p.id === active)

  return (
    <section className="py-20 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">

        <AnimateIn>
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-navy/40 mb-3">How it works</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy max-w-2xl mx-auto">
              Three things. Everything else lives underneath.
            </h2>
          </div>
        </AnimateIn>

        {/* Pill tabs */}
        <AnimateIn delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-10">
            {PILLARS.map(p => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border"
                style={{
                  background: active === p.id ? '#0a0a0a' : 'transparent',
                  color: active === p.id ? '#fff' : '#555',
                  borderColor: active === p.id ? '#0a0a0a' : '#e8e8e8',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* Content panel */}
        <AnimateIn delay={0.15} key={active}>
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">

            {/* Text side */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5
                rounded-full border border-navy/15 text-navy/60 mb-4">
                {pillar.tag}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy mb-4 leading-tight">
                {pillar.headline}
              </h3>
              <p className="text-ink-soft leading-relaxed mb-6">{pillar.body}</p>
              <ul className="space-y-2.5 mb-8">
                {pillar.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-navy/80">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={pillar.cta.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy
                  border-b border-navy/30 pb-0.5 hover:border-navy transition-colors">
                {pillar.cta.label} →
              </Link>
            </div>

            {/* Image side */}
            <div className="rounded-2xl overflow-hidden border border-navy/8 bg-parchment/40">
              <img
                src={pillar.image}
                alt={pillar.imageAlt}
                className="w-full h-64 md:h-80 object-cover opacity-90"
              />
            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
