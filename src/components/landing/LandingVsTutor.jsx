// "How this compares to a tutor" — a real semantic <table> (the brand rule:
// comparison tables stay real tables, not styled divs). Scrolls on narrow
// screens rather than breaking the page width.
const ROWS = [
  { label: 'Cost', tutor: 'Hourly, recurring', academy: 'One payment, keeps going' },
  { label: 'When you get help', tutor: 'When you’ve booked a slot', academy: 'Whenever you open it' },
  { label: 'Pace', tutor: 'Their calendar', academy: 'Your timeline' },
  {
    label: 'What happens after',
    tutor: 'It stops when you stop paying',
    academy: 'You keep the method for your IAs and your papers',
  },
]

export default function LandingVsTutor() {
  return (
    <section className="bg-parchment/30 px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-4">
          How this compares to a tutor
        </h2>
        <p className="text-[1.0625rem] leading-[1.75] text-navy/90 mb-8">
          A good tutor helps. The problem isn&rsquo;t quality, it&rsquo;s shape.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-navy/10 bg-white">
          <table className="w-full border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-navy/10">
                <th scope="col" className="px-5 py-4 font-semibold text-ink-soft w-1/4" />
                <th scope="col" className="px-5 py-4 font-semibold text-navy/70">Tutor</th>
                <th scope="col" className="px-5 py-4 font-semibold text-navy bg-cream/60">The EE Academy</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.label} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(46,50,80,0.07)' }}>
                  <th scope="row" className="px-5 py-4 font-semibold text-navy align-top">{r.label}</th>
                  <td className="px-5 py-4 text-navy/70 align-top">{r.tutor}</td>
                  <td className="px-5 py-4 text-navy align-top bg-cream/60 font-medium">{r.academy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[1.0625rem] leading-[1.75] text-navy/90 mt-8">
          The EE is not a subject you need explained. It&rsquo;s a process you need shown. Once,
          properly, by someone who&rsquo;s done it.
        </p>
      </div>
    </section>
  )
}
