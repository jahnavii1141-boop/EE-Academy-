import Link from 'next/link'

// No anchor price, no countdown, no "normally $X". One honest line. The primary
// action here points BACKWARDS into the free lessons — nobody should hit this
// section as their first stop.
export default function LandingPrice() {
  return (
    <section className="bg-parchment/30 px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-8">Price</h2>

        <div className="rounded-2xl border border-navy/10 bg-white px-6 py-5 flex items-baseline justify-between">
          <div>
            <p className="font-semibold text-navy">The full course</p>
            <p className="text-sm text-ink-soft mt-0.5">The complete 14-lesson system, plus the tools and templates.</p>
          </div>
          <p className="font-serif text-2xl font-bold text-navy">$79</p>
        </div>

        <p className="text-sm text-ink-soft mt-4">
          One-time payment · lifetime access, including the 2027 guide updates.{' '}
          <Link href="/pricing" className="underline underline-offset-2 hover:text-navy">See what's included →</Link>
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
