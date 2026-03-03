import AnimateIn from './ui/AnimateIn'

const CREDENTIALS = [
  { label: '10+ Years IB Teaching' },
  { label: 'Former IB Examiner' },
  { label: '50,000+ Students Taught' },
  { label: 'Best-Selling EE Guide Author' },
]

export default function Instructor() {
  return (
    <section id="instructor" className="bg-navy py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimateIn>
          <h2 className="section-heading-light">Your Instructor</h2>
          <p className="section-subheading-light">
            Learn from a former IB examiner who knows exactly what earns top marks.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className="bento-card bg-cream/8 border border-cream/10 shadow-lg shadow-black/20 md:flex gap-8 items-start">
            <div className="flex-shrink-0 flex flex-col items-center mb-6 md:mb-0">
              {/* Premium avatar with feather accent */}
              <div className="w-24 h-24 rounded-2xl bg-cream/15 border border-cream/20 flex items-center justify-center relative overflow-hidden shadow-md">
                <img src="/feather-md.png" alt="" className="absolute w-12 h-auto opacity-30" />
                <span className="relative z-10 text-cream text-2xl font-serif font-bold">AJ</span>
              </div>
              <p className="mt-3 font-serif font-bold text-cream text-lg">Alex Johnson</p>
              <p className="text-xs text-steel text-center mt-0.5">IB Educator & EE Specialist</p>
              <div className="flex gap-3 mt-3">
                <a href="#" aria-label="GitHub" className="text-steel hover:text-cream transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="text-steel hover:text-cream transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <p className="text-ink-soft text-sm leading-relaxed mb-5">
                Alex spent a decade teaching IB students and serving as a trained EE examiner for the International Baccalaureate.
                He's seen thousands of essays — the brilliant and the borderline — and built this programme around the patterns that separate them.
                His practical, examiner-informed teaching style consistently helps students jump two or three grades.
              </p>
              <div className="flex flex-wrap gap-2">
                {CREDENTIALS.map((c, i) => (
                  <span
                    key={i}
                    className="bg-cream/8 text-cream text-xs font-medium px-3 py-1.5 rounded-full border border-cream/10 hover:scale-105 transition-transform cursor-default"
                  >
                    {c.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
