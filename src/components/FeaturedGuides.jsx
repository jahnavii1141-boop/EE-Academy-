import Link from 'next/link'

const FEATURED_GUIDES = [
  {
    href: '/guides/research-question-examples',
    label: 'Research Question',
    title: 'Research Question Examples',
    description: 'Strong RQ patterns and real examples across subjects. Stop guessing what a good RQ looks like.',
    icon: '🔍',
  },
  {
    href: '/guides/how-to-get-an-a-in-extended-essay',
    label: 'Strategy',
    title: 'How to Get an A',
    description: 'A step-by-step framework to reach 27/34 and above — from topic selection to submission.',
    icon: '🏆',
  },
  {
    href: '/guides/extended-essay-structure',
    label: 'Structure',
    title: 'EE Structure Template',
    description: 'Follow a proven section-by-section outline and map each part to the markscheme.',
    icon: '📐',
  },
  {
    href: '/guides/rppf-guide',
    label: 'RPPF',
    title: 'RPPF Guide',
    description: 'Write stronger reflections and maximise Criterion E marks — with real examples.',
    icon: '📝',
  },
  {
    href: '/guides/ee-criteria-breakdown',
    label: 'Criteria',
    title: 'IB EE Criteria Explained',
    description: 'Understand exactly how examiners award marks across all five assessment criteria.',
    icon: '📊',
  },
  {
    href: '/guides/ee-citations-mla',
    label: 'Citations',
    title: 'Citations & MLA Guide',
    description: 'In-text citations, block quotes, and Works Cited — with academic integrity rules.',
    icon: '📚',
  },
]

export default function FeaturedGuides() {
  return (
    <section className="bg-parchment/30 py-16 px-6 border-t border-navy/8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-navy/40 mb-2">
              Free Guides
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy leading-tight">
              Everything you need to know, free
            </h2>
            <p className="text-navy/60 text-sm mt-2 max-w-lg">
              30+ in-depth guides covering every part of the IB Extended Essay — from choosing your topic to submitting your RPPF.
            </p>
          </div>
          <Link
            href="/guides"
            className="text-sm font-medium text-navy/70 hover:text-navy transition-colors underline underline-offset-4 flex-shrink-0"
          >
            Browse all guides →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl border border-navy/10 hover:border-navy/25 bg-white/60 hover:bg-white/80 transition-all px-5 py-5"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
                  {guide.icon}
                </span>
                <div>
                  <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-navy/40 mb-1">
                    {guide.label}
                  </span>
                  <h3 className="text-sm font-semibold text-navy group-hover:text-navy leading-snug mb-1">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-navy/55 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
