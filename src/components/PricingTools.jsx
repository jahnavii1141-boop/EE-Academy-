import Image from 'next/image'

// "What you get access to" — the product tour above the price card. Four groups,
// one screenshot each, with the tools listed as text beneath (not one card per
// tool). Only the Plan-it tools are free (small text label, no lock icon).
// Screenshots are pre-sized WebP (≤900px) in /public/pricing, rendered with
// next/image, lazy-loaded and below the fold, so they don't move the page's
// Lighthouse score.
const GROUPS = [
  {
    name: 'Plan it',
    img: '/pricing/planner.webp',
    tools: [
      { label: 'EE Planner', free: true },
      { label: 'Pathway Finder', free: true },
      { label: 'Research Question Checker', free: true },
    ],
  },
  {
    name: 'Research it',
    img: '/pricing/dump.webp',
    tools: [
      { label: 'EE Dump' },
      { label: 'Citation generator' },
      { label: 'AI prompts' },
    ],
  },
  {
    name: 'Write it',
    img: '/pricing/editor.webp',
    tools: [
      { label: 'Essay editor' },
      { label: 'Essay outline' },
      { label: 'Argument map' },
    ],
  },
  {
    name: 'Work with your supervisor',
    img: '/pricing/share.webp',
    tools: [
      { label: 'Share link' },
      { label: 'Supervisor comments' },
      { label: 'Supervisor Reply Drafter' },
      { label: 'RPPF prompts' },
    ],
  },
]

export default function PricingTools() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-8 text-center">
        What you get access to
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {GROUPS.map((g) => (
          <div key={g.name} className="rounded-2xl border border-navy/10 bg-white overflow-hidden">
            <div className="relative aspect-[16/10] bg-parchment/30 border-b border-navy/8">
              <Image
                src={g.img}
                alt={`${g.name} — screenshot`}
                fill
                sizes="(max-width: 640px) 100vw, 480px"
                loading="lazy"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-bold text-navy mb-2">{g.name}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                {g.tools.map((t, i) => (
                  <span key={t.label}>
                    {i > 0 && <span className="text-navy/25"> · </span>}
                    {t.label}
                    {t.free && (
                      <span className="ml-1 text-[11px] font-semibold text-emerald-600 align-middle">Free</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-ink-soft mt-8 max-w-2xl mx-auto">
        Plus all templates &amp; SOPs, and a real 32/34 essay broken down criterion by criterion.
      </p>
    </section>
  )
}
