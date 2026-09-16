// "What you get free, that tutors charge for" — draws the line between the
// finite, published stuff (free here) and the hard part (the course).
const HARD_PARTS = [
  'How to research so your sources build an argument instead of a pile',
  'How to find an angle that’s yours, not the one four other students in your cohort picked',
  'How to turn description into analysis — the single reason most EEs drop from an A to a B',
  'How to plan backwards from your deadline instead of panicking forwards from today',
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
            None of that is worth paying for. It&rsquo;s published, it&rsquo;s finite, and you can
            read it in an afternoon. It&rsquo;s all on this site, free, no account.
          </p>
          <p className="font-semibold text-navy">What&rsquo;s actually hard is the part nobody hands you:</p>
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
          That&rsquo;s the course. Fourteen guides, following one real 32/34 essay from research
          question to final draft. The first five are open. No account, no card.
        </p>
      </div>
    </section>
  )
}
