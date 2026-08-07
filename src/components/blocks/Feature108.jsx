'use client'

import { useState } from 'react'
import Link from 'next/link'
import AnimateIn from '../ui/AnimateIn'

// ── Three pillars — every feature on the site lives under one of these ───────
const PILLARS = [
  {
    id: 'plan',
    label: 'The Plan',
    tag: 'From blank page to structured draft',
    headline: 'From blank page to structured draft, week by week.',
    body: 'A 14-module path that turns a far-off deadline into this week\'s three tasks. The Research Question Checker stops you sinking weeks into a question that can\'t break a C. The EE Planner breaks the whole essay into weekly targets, so you always know your next move instead of drifting.',
    features: ['14-module curriculum', 'Research Question Checker', 'EE Planner (week-by-week)', 'Essay editor with autosave'],
    cta: { label: 'Start Module 1 free', href: '/course/module-1' },
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    imageAlt: 'Student working on essay at desk',
  },
  {
    id: 'scan',
    label: 'The Grade Scan',
    tag: 'See it the way an examiner will',
    headline: 'See your essay the way an examiner will.',
    body: 'Run your draft against the real assessment criteria and surface the weak analysis, vague phrasing, and structural gaps that quietly cost you marks, before your supervisor flags them and long before an examiner does.',
    features: ['AI Grade Scan (criteria-by-criteria)', 'Polish Pass — argument + language', 'Supervisor Reply Drafter', '32/34 essay full breakdown'],
    cta: { label: 'Start free', href: '/course/module-1' },
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    imageAlt: 'Graded paper with annotations',
  },
  {
    id: 'save',
    label: 'The Save',
    tag: 'When you are out of time',
    headline: 'When you\'re out of time, fix what matters first.',
    body: 'The 1-Day Protocol is a triage system for students staring down a deadline. It tells you the highest-impact edits to make right now, so your final draft is tighter, clearer, and more examiner-friendly, even at 11pm the night before submission.',
    features: ['1-Day Protocol (deadline triage)', 'Citation generator + bibliography', 'Share with supervisor (live link)', 'All SOPs & submission checklist'],
    cta: { label: 'Start free', href: '/course/module-1' },
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
              Three things. Everything else sits underneath them.
            </h2>
            <p className="text-ink-soft leading-relaxed max-w-2xl mx-auto mt-4">
              Most EE help is either a vague PDF or a $100-an-hour tutor. This is a system, three moving parts
              that take you from blank page to a draft that actually scores.
            </p>
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

        <AnimateIn delay={0.2}>
          <p className="max-w-2xl mx-auto text-center text-ink-soft leading-relaxed mt-14">
            Everything maps to the markscheme. You&apos;re never guessing what &ldquo;good&rdquo; means,
            you&apos;re matching your essay to the exact thing examiners score. That&apos;s the difference
            between hoping for an A and engineering one.
          </p>
        </AnimateIn>

      </div>
    </section>
  )
}
