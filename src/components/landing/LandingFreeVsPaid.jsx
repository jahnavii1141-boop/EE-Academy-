// "What you get free, that tutors charge for" — draws the line between the
// finite, published stuff (free here) and the hard part (the course).
const HARD_PARTS = [
  'How to research so your sources build an argument, rather than a collection of summaries',
  'How to find an original angle, not the one four other students in your cohort chose',
  'How to turn description into analysis — the single reason most EEs drop from an A to a B',
  'How to plan backwards from your deadline, rather than working forward in a rush from today',
]

export default function LandingFreeVsPaid() {
  return (
    <section className="bg-cream px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-6">
          What you get free, that tutors charge for
        </h2>
        <div className="space-y-4 text-[1.0625rem] leading-[1.75] text-navy/90">
          <p>The criteria. The word count rules. The formatting. The templates. The checklist.</p>
          <p>
            None of it is worth paying for. It is published, finite, and freely available — all of it
            is on this site, with no account required.
          </p>
          <p className="font-semibold text-navy">The difficult part is the one no guide hands you:</p>
        </div>

        <ul className="mt-5 space-y-3">
          {HARD_PARTS.map((item) => (
            <li key={item} className="flex gap-3 text-[1.0625rem] leading-[1.6] text-navy/90">
              <span aria-hidden className="mt-[0.5rem] h-1.5 w-1.5 rounded-full bg-navy/40 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-[1.0625rem] leading-[1.75] text-navy/90 mt-6">
          That is the course: fourteen guides that follow one real 32/34 essay from research question
          to final draft. The first five are open to read, with no account required.
        </p>
      </div>
    </section>
  )
}
