// Honest disqualification — the least salesy trust signal available.
export default function WhatThisIs() {
  return (
    <section className="bg-cream px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-6">What this is, and isn&apos;t</h2>
        <div className="space-y-4 text-[1.0625rem] leading-[1.75] text-navy/90">
          <p>
            <span className="font-semibold">This is</span> a system for writing your own EE, start to finish.
          </p>
          <p>
            <span className="font-semibold">This isn&apos;t</span> a bank of essays to copy. It isn&apos;t a grade
            guarantee — it shows what earned 32/34, not what will earn you one. And it won&apos;t write the
            essay for you; if that&apos;s what you&apos;re after, this will waste your time.
          </p>
        </div>
      </div>
    </section>
  )
}
