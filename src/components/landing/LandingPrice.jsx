import Link from 'next/link'

// No anchor price, no countdown, no "normally $X". Two honest tiers, one line
// each. The primary action here points BACKWARDS into the free lessons —
// nobody should hit this section as their first stop.
export default function LandingPrice() {
  return (
    <section className="bg-parchment/30 px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-8">Price</h2>

        <div className="rounded-2xl border border-navy/10 bg-white divide-y divide-navy/8">
          <div className="flex items-baseline justify-between px-6 py-5">
            <div>
              <p className="font-semibold text-navy">Standard</p>
              <p className="text-sm text-ink-soft mt-0.5">The complete 14-lesson course.</p>
            </div>
            <p className="font-serif text-2xl font-bold text-navy">$79</p>
          </div>
          <div className="flex items-baseline justify-between px-6 py-5">
            <div>
              <p className="font-semibold text-navy">Premium</p>
              <p className="text-sm text-ink-soft mt-0.5">The course plus the writing tools and AI guidance.</p>
            </div>
            <p className="font-serif text-2xl font-bold text-navy">$149</p>
          </div>
        </div>

        <p className="text-sm text-ink-soft mt-4">
          Paid once. Lifetime access, including the 2027 guide updates.{' '}
          <Link href="/pricing" className="underline underline-offset-2 hover:text-navy">Compare plans →</Link>
        </p>

        <Link
          href="/course/module-1"
          className="inline-flex mt-8 text-[15px] font-semibold text-navy underline underline-offset-4 hover:opacity-80"
        >
          Read the free lessons first →
        </Link>
      </div>
    </section>
  )
}
