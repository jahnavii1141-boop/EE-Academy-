'use client'

import Link from 'next/link'
import SEOHead from '../components/SEOHead'

const GUIDES = [
  {
    href: '/guides/how-to-get-an-a-in-extended-essay',
    title: 'How to Get an A in the Extended Essay',
    description: 'A practical step-by-step framework to reach 27/34 and above.',
  },
  {
    href: '/guides/ee-criteria-breakdown',
    title: 'IB Extended Essay Criteria Explained',
    description: 'Understand exactly how examiners award marks across all criteria.',
  },
  {
    href: '/guides/extended-essay-structure',
    title: 'EE Structure Template',
    description: 'Follow a proven section-by-section outline for a high-scoring essay.',
  },
  {
    href: '/guides/research-question-examples',
    title: 'Extended Essay Research Question Examples',
    description: 'Use strong RQ patterns and examples to avoid vague topics.',
  },
  {
    href: '/guides/rppf-guide',
    title: 'RPPF Guide',
    description: 'Write stronger reflections and maximize Criterion E marks.',
  },
  {
    href: '/guides/extended-essay-introduction',
    title: 'How to Write an Extended Essay Introduction',
    description: 'Open with clarity, context, and a precise research question.',
  },
]

export default function GuidesHub() {
  return (
    <main className="min-h-screen bg-cream">
      <SEOHead
        title="IB Extended Essay Guides"
        description="Free IB Extended Essay guides on getting an A, structure, criteria, RPPF, research questions, and writing strategy."
        canonical="/guides"
      />

      <section className="max-w-6xl mx-auto px-6 pt-14 pb-20">
        <span className="inline-flex items-center bg-navy/8 text-navy text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-navy/12 tracking-wide">
          Free IB EE Guides
        </span>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-4">
          IB Extended Essay Guides
        </h1>
        <p className="text-lg text-ink-soft max-w-3xl mb-10">
          Use these step-by-step guides to improve your EE strategy, writing quality, and scoring outcomes.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GUIDES.map((guide) => (
            <Link
              key={guide.href}
              to={guide.href}
              className="rounded-2xl border border-navy/10 bg-parchment/30 hover:bg-parchment/55 hover:border-navy/20 transition-all p-5"
            >
              <h2 className="font-serif text-xl font-semibold text-navy leading-tight mb-2">
                {guide.title}
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
