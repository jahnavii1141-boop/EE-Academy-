import Link from 'next/link'

// "Written by someone who sat it" — the by-hand / not-AI trust signal. Stays
// faceless: an IB graduate who scored 32/34, never a name. Guide 13 is the
// openable essay itself.
export default function LandingWrittenBy() {
  return (
    <section className="bg-parchment/30 px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-6">
          Written by someone who sat it
        </h2>
        <div className="space-y-4 text-[1.0625rem] leading-[1.75] text-navy/90">
          <p>
            Every word on this site was written by hand, by an IB graduate who wrote an Extended
            Essay and scored 32/34. Not generated. Not outsourced to a content team.
          </p>
          <p>
            You can read the essay itself in{' '}
            <Link href="/course/module-13" className="underline underline-offset-2 hover:text-navy font-medium">
              Guide 13
            </Link>
            , including where the two marks went.
          </p>
          <p>
            That&rsquo;s the whole difference. Everything else is guides about the EE. This is the EE,
            opened up.
          </p>
        </div>
      </div>
    </section>
  )
}
