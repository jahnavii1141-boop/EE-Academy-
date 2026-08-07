import Link from 'next/link'

const BENEFITS = [
  'The full 14-mission EE system, blank page to finished draft, nothing skipped',
  'The Research Question Checker, kill a dead-end RQ before it costs you three weeks',
  'The EE Planner, your whole essay broken into week-by-week targets',
  'The Grade Scan plus the real 32/34 essay fully broken down, so you see exactly what an A looks like and why',
  'The 1-Day Protocol, deadline rescue for when you are out of time',
  'Every template, framework, checklist and SOP, downloadable and reusable',
  'The EE Dump research workspace, turn scattered notes into a usable structure',
]

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    note: 'Free forever',
    features: 'Your first missions plus the EE Planner.',
    cta: 'Start free',
    href: '/dashboard/home',
    highlight: false,
  },
  {
    name: 'Standard',
    price: '$79',
    note: 'One-time',
    features: 'The full 14-mission system, every guide, framework and checklist. Lifetime access.',
    cta: 'Get the full system',
    href: '/pricing',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$149',
    note: 'One-time · Most popular',
    features:
      'Everything in Standard, plus the EE Dump workspace, the Grade Scan tools, all downloadable templates and SOPs, the AI analysis prompts, and the complete 32/34 essay breakdown.',
    cta: 'Get Premium',
    href: '/pricing',
    highlight: true,
  },
]

export default function HomeOffer() {
  return (
    <section id="offer" className="bg-parchment/40 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-heading text-center mb-6">What this would cost you anywhere else.</h2>
        <p className="max-w-2xl mx-auto text-center text-navy/70 leading-relaxed mb-12">
          A private EE tutor charges $50 to $150 an hour. Three sessions and you have spent $300 to $600,
          for a few hours of someone else&apos;s time and notes you will lose. This is the entire system, the
          tools, and the templates, forever, for less than the price of a single tutoring session.
        </p>

        <ul className="max-w-2xl mx-auto grid gap-3 mb-14">
          {BENEFITS.map((b, i) => (
            <li key={i} className="flex gap-3 text-navy/80 text-[15px] leading-relaxed">
              <span className="text-navy mt-0.5 shrink-0">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl border p-7 flex flex-col ${
                t.highlight
                  ? 'border-navy bg-navy-deep text-cream shadow-lg md:-translate-y-2'
                  : 'border-navy/15 bg-cream text-navy'
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-parchment px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">
                  Most popular
                </span>
              )}
              <div className="mb-1 text-sm font-bold uppercase tracking-wide opacity-70">{t.name}</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif text-4xl font-bold">{t.price}</span>
              </div>
              <div className={`text-xs mb-5 ${t.highlight ? 'text-parchment/70' : 'text-navy/55'}`}>
                {t.note}
              </div>
              <p className={`text-sm leading-relaxed flex-1 ${t.highlight ? 'text-cream/85' : 'text-navy/75'}`}>
                {t.features}
              </p>
              <Link
                href={t.href}
                className={`mt-6 inline-flex justify-center rounded-lg px-5 py-3 text-sm font-semibold transition ${
                  t.highlight
                    ? 'bg-parchment text-navy hover:bg-cream'
                    : 'bg-navy text-cream hover:bg-navy-deep'
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-navy/60 mt-8">
          Standard $79 once. Premium $149 once. No subscription, no hidden fees, lifetime access. Backed by a
          30-day, no-questions-asked guarantee.
        </p>
      </div>
    </section>
  )
}
