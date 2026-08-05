// PROOF SECTION
// -----------------------------------------------------------------------------
// TODO (BEFORE LAUNCH): Replace the placeholder testimonials below with REAL,
// verifiable student results. Do NOT ship the [REPLACE ...] placeholders live.
// Never fabricate quotes, names, schools, or grades. If you only have one real
// result, delete the other two cards and run the single honest one.
// -----------------------------------------------------------------------------

// Real quotes only — never fabricate. Add name/subject/year details when the
// student allows attribution; omit whatever we don't have.
const TESTIMONIALS = [
  {
    quote: "I think the one thing that the site helped me with is understanding what I'm actually being scored for.",
    name: 'EE Academy student',
    detail: 'Global Politics EE',
  },
  {
    quote: '[REPLACE — real student quote]',
    name: '[First name]',
    detail: '[Subject · School or country · Class year]',
  },
  {
    quote: '[REPLACE — real student quote]',
    name: '[First name]',
    detail: '[Subject · School or country · Class year]',
  },
]

export default function HomeProof() {
  // Only ever render REAL testimonials — the [REPLACE …] placeholders are hidden
  // until genuine ones are added (just remove the "[REPLACE" text and they appear).
  const real = TESTIMONIALS.filter((t) => !t.quote.includes('[REPLACE'))
  return (
    <section className="bg-cream px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {real.length === 1 && (
          // A single student quote is paired with a founder note so the section
          // reads intentionally full. The grid layout below takes over at 2+.
          // Faceless brand: the founder stays unnamed ("The Founder").
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mb-14 items-stretch">
            <figure className="rounded-2xl border border-navy/10 bg-white p-8 flex flex-col">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy/40 mb-4">
                From a student
              </p>
              <blockquote className="font-serif text-xl leading-snug text-navy flex-1">
                &ldquo;{real[0].quote}&rdquo;
              </blockquote>
              <figcaption className="text-navy/55 text-sm mt-6">
                — {real[0].name}{real[0].detail ? ` · ${real[0].detail}` : ''}
              </figcaption>
            </figure>

            <figure className="rounded-2xl border border-navy/10 bg-parchment/40 p-8 flex flex-col">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy/40 mb-4">
                From the founder
              </p>
              <blockquote className="font-serif text-xl leading-snug text-navy flex-1">
                &ldquo;I got a 32/34 because I finally understood what examiners actually reward.
                This site is that system written down, so you never have to guess.&rdquo;
              </blockquote>
              <figcaption className="text-navy/55 text-sm mt-6">
                — The Founder · 32/34 Extended Essay, final A
              </figcaption>
            </figure>
          </div>
        )}

        {real.length >= 2 && (
          <>
            <h2 className="section-heading text-center mb-12">Real results from real IB students.</h2>

            <div className="grid gap-6 md:grid-cols-3 mb-16">
              {real.map((t, i) => (
                <figure
                  key={i}
                  className="rounded-2xl border border-navy/10 bg-parchment/40 p-6 flex flex-col"
                >
                  <blockquote className="text-navy/80 text-[15px] leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-navy/10">
                    <span className="block font-semibold text-navy text-sm">{t.name}</span>
                    <span className="block text-navy/55 text-xs mt-0.5">{t.detail}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        )}

        {/* Brand credibility block — no named person, no first-person voice */}
        <div className="max-w-3xl mx-auto text-center rounded-2xl border border-navy/10 bg-navy-deep px-8 py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-parchment/70 mb-4">
            Built from a real 32/34 Extended Essay
          </p>
          <p className="text-cream text-lg leading-relaxed">
            The Extended Essay Academy is built from the exact system that took a real Extended Essay to
            32 out of 34, a final A. It isn&apos;t a faceless essay mill and it isn&apos;t recycled advice
            scraped off the internet. It&apos;s the resource we wished existed when the deadline was closing
            in and the document was still blank.
          </p>
        </div>
      </div>
    </section>
  )
}
