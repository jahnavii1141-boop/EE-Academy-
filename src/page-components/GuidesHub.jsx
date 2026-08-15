'use client'

import Link from 'next/link'
import SEOHead from '../components/SEOHead'

// ── All 30 guides — every guide page must be linked here for Google to find it ─
const GUIDE_SECTIONS = [
  {
    label: 'Start here',
    guides: [
      { href: '/guides/how-to-get-an-a-in-extended-essay', title: 'How to Get an A in the Extended Essay', description: 'A step-by-step framework to reach 27/34 and above — from topic to submission.' },
      { href: '/guides/ee-criteria-breakdown', title: 'IB Extended Essay Criteria Explained', description: 'Understand exactly how examiners award marks across all five criteria.' },
      { href: '/guides/ee-mindset', title: 'The Mindset Shift That Changes Everything', description: 'The biggest reason students underperform isn\'t intelligence — it\'s the wrong mental model.' },
      { href: '/guides/ee-analysis-vs-description', title: 'Analysis vs Description', description: '"Merely descriptive" is the most common reason EEs drop from A to B. Here\'s how to fix it.' },
    ],
  },
  {
    label: 'Research question',
    guides: [
      { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Strong RQ patterns and real examples across subjects. Stop guessing what a good RQ looks like.' },
      { href: '/guides/ee-subjects-guide', title: 'Best IB Extended Essay Subjects', description: 'Compare subject options and choose one that gives you the best chance of scoring well.' },
      { href: '/guides/ee-dump-method', title: 'The EE Dump Method: How to Research Your EE', description: 'Build your source base first, then write with confidence — the system behind a 32/34.' },
      { href: '/guides/how-to-use-google-scholar-ee', title: 'How to Use Google Scholar for Your EE', description: 'Find peer-reviewed sources and build an A-grade bibliography step by step.' },
    ],
  },
  {
    label: 'Structure & writing',
    guides: [
      { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'Follow a proven section-by-section outline and map each part to the markscheme.' },
      { href: '/guides/extended-essay-introduction', title: 'How to Write an EE Introduction', description: 'Open with clarity, context, and a precise research question setup.' },
      { href: '/guides/ee-conclusion', title: 'How to Write an EE Conclusion', description: 'Answer the research question directly and close your argument with authority.' },
      { href: '/guides/ee-literature-review', title: 'How to Write an EE Literature Review', description: 'The literature review is not a source summary. Learn what it actually does.' },
      { href: '/guides/ee-academic-writing', title: 'How to Write Academically for the IB EE', description: 'Sentence patterns, paragraph structure, and the register that signals A-grade thinking.' },
      { href: '/guides/ee-research-methods', title: 'EE Research Methods Guide', description: 'Choose better research methods and justify them clearly in your essay.' },
    ],
  },
  {
    label: 'Subject guides',
    guides: [
      { href: '/guides/ee-business-management', title: 'Business Management EE Guide', description: 'Framework stack, RQ structure, data sources, and the original-finding principle.' },
      { href: '/guides/ee-economics', title: 'Economics EE Guide', description: 'The sub-RQ method, key frameworks, best data sources, and A-band analysis structure.' },
      { href: '/guides/ee-history', title: 'History EE Guide', description: 'History EEs are arguments, not summaries. How to frame your RQ and engage with historiography.' },
      { href: '/guides/ee-psychology', title: 'Psychology EE Guide', description: 'Evaluating research, three levels of analysis, and building arguments from conflicting evidence.' },
      { href: '/guides/ee-biology', title: 'Biology EE Guide', description: 'Primary research EEs: RQ formula, experiment design, statistical analysis requirements.' },
    ],
  },
  {
    label: 'Format & submissions',
    guides: [
      { href: '/guides/ee-formatting-guide', title: 'EE Formatting Guide', description: 'Formatting is free marks. Font, spacing, margins, title page, and the 15-minute checklist.' },
      { href: '/guides/ee-citations-mla', title: 'Citations and MLA Formatting Guide', description: 'In-text citations, block quotes, and Works Cited — with academic integrity rules.' },
      { href: '/guides/ee-word-count', title: 'EE Word Count Guide', description: 'The word count rules, section balance, and the mistakes that quietly weaken your draft.' },
      { href: '/guides/ee-abstract', title: 'EE Abstract: Do You Need One?', description: 'IB removed the mandatory abstract in 2018. How to write one if your school still requires it.' },
      { href: '/guides/rppf-guide', title: 'RPPF Guide', description: 'Write stronger reflections and maximise Criterion E marks.' },
      { href: '/guides/ee-checklist', title: 'EE Submission Checklist', description: 'Run through this checklist before you submit — RQ, format, citations, word count.' },
    ],
  },
  {
    label: 'Tools & strategy',
    guides: [
      { href: '/guides/extended-essay-tips', title: 'EE Tips That Actually Improve Your Grade', description: 'Practical improvements for structure, analysis, citations, reflections, and final score.' },
      { href: '/guides/ee-planning-timeline', title: 'EE Timeline and Planning Guide', description: 'A 6-phase 16-week reverse-engineered timeline from topic selection to submission.' },
      { href: '/guides/ee-supervisor-tips', title: 'How to Work With Your EE Supervisor', description: 'Your supervisor writes your predicted grade. How to use your three meetings effectively.' },
      { href: '/guides/ee-ai-guide', title: 'How to Use AI for Your EE', description: 'The exact prompts for stress-testing your RQ and critiquing your draft — without crossing integrity rules.' },
      { href: '/guides/ee-clastify-guide', title: 'How to Use Clastify for Your EE', description: 'How to use graded EEs for calibration — and the line between inspiration and misconduct.' },
    ],
  },
]

export default function GuidesHub() {
  const totalGuides = GUIDE_SECTIONS.reduce((n, s) => n + s.guides.length, 0)

  return (
    <main className="min-h-screen bg-cream">
      <SEOHead
        title="IB Extended Essay Guides — Free Resources | The Extended Essay Academy"
        description={`${totalGuides} free IB Extended Essay guides on research questions, structure, criteria, subject choices, formatting, and writing strategy.`}
        canonical="/guides"
      />

      <section className="max-w-6xl mx-auto px-6 pt-14 pb-24">
        {/* Header */}
        <span className="inline-flex items-center bg-navy/8 text-navy text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-navy/12 tracking-wide">
          {totalGuides} Free Guides
        </span>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-4">
          IB Extended Essay Guides
        </h1>
        <p className="text-lg text-ink-soft max-w-3xl mb-12">
          Step-by-step guides to improve your EE strategy, writing quality, and score — free, no login needed.
        </p>

        {/* Sections */}
        <div className="space-y-14">
          {GUIDE_SECTIONS.map((section) => (
            <div key={section.label}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-navy/40 mb-4">
                {section.label}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.guides.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="rounded-xl border border-navy/10 hover:border-navy/25 bg-white/60 hover:bg-white
                      transition-all px-5 py-4 group"
                  >
                    <p className="text-sm font-semibold text-navy group-hover:text-navy leading-snug mb-1">
                      {guide.title}
                    </p>
                    <p className="text-xs text-navy/50 leading-relaxed">{guide.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-navy text-center px-8 py-10">
          <h2 className="font-serif text-2xl font-bold text-cream mb-2">Want the full system?</h2>
          <p className="text-steel text-sm mb-6 max-w-md mx-auto">
            These guides cover the concepts. The full 14-lesson course walks you through one real 32/34 essay, step by step — the first five lessons are open, no account needed.
          </p>
          <Link href="/course/module-1" className="btn-primary-light text-sm">Start lesson 1 →</Link>
        </div>
      </section>
    </main>
  )
}
