'use client'

import AnimateIn from "./ui/AnimateIn";

export default function EvervaultCTA() {
  return (
    <section className="bg-navy py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: IB-themed copy */}
          <div>
            <AnimateIn>
              <span className="inline-flex items-center bg-parchment/10 text-parchment text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-parchment/20 tracking-wide">
                START FREE TODAY
              </span>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-cream leading-tight mb-5">
                Your deadline isn&apos;t moving.<br />
                <span className="text-steel">Your grade still can.</span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <p className="text-steel text-base leading-relaxed mb-8 max-w-md">
                Start free today, no card. See the difference in your very next draft, then unlock the full
                system whenever you&apos;re ready.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.18}>
              <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-2xl">
                {[
                  {
                    title: 'EE Planner',
                    text: 'Get a personalised EE plan based on your progress and deadline.',
                  },
                  {
                    title: 'Study Calendar',
                    text: 'Know exactly what to do each week until submission.',
                  },
                  {
                    title: 'EE Dump Workspace',
                    text: 'Turn scattered ideas into a usable structure before you start drafting.',
                  },
                  {
                    title: 'Source Tracker',
                    text: 'Keep your research organised so you stop losing evidence, quotes, and references.',
                  },
                ].map((tool) => (
                  <div key={tool.title} className="rounded-xl border border-parchment/15 bg-cream/5 p-4">
                    <p className="text-sm font-semibold text-cream mb-1">{tool.title}</p>
                    <p className="text-xs text-steel leading-relaxed">{tool.text}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <ul className="space-y-4 mb-10">
                {[
                  "Find the weak analysis, vague phrasing, and structure issues costing you marks",
                  "Fix the small mistakes that make your EE feel weaker than it is",
                  "Know what to prioritise when you do not have time to do everything",
                  "Use the highest-impact edits first so your final draft is tighter, clearer, and more examiner-friendly",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-cream/80">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-parchment/15 border border-parchment/25 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-parchment" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </AnimateIn>

            <AnimateIn delay={0.22}>
              <p className="text-sm font-semibold text-parchment/90 mb-6">
                Built from the exact system behind a real 32/34 Extended Essay, a final A.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.25}>
              <div className="flex flex-wrap items-center gap-4">
                <a href="/dashboard/home" className="btn-primary-light">
                  Start free — no card
                </a>
                <a href="/pricing" className="btn-outline-light text-sm">
                  See pricing →
                </a>
              </div>
            </AnimateIn>
          </div>

          {/* Right: real tool screenshots */}
          <AnimateIn delay={0.15} className="flex justify-center">
            <div className="max-w-xl w-full mx-auto relative">
              <div className="absolute inset-0 bg-parchment/8 blur-3xl rounded-[32px]" />
              <div className="relative grid gap-4">
                <div className="rounded-[24px] border border-parchment/20 bg-cream/5 p-3 shadow-2xl">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-parchment/65">Bonus Vault</p>
                      <p className="text-sm font-semibold text-cream">EE Planner</p>
                    </div>
                    <span className="rounded-full border border-parchment/15 bg-parchment/10 px-2.5 py-1 text-[11px] font-semibold text-parchment">
                      Native tool
                    </span>
                  </div>
                  <img
                    src="/images/planner-tool.png"
                    alt="EE Planner screenshot"
                    className="w-full rounded-[18px] border border-parchment/10"
                  />
                </div>

                <div className="md:absolute md:-bottom-10 md:-right-10 w-full md:w-[72%] rounded-[24px] border border-parchment/20 bg-cream/5 p-3 shadow-2xl">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-parchment/65">Bonus Vault</p>
                      <p className="text-sm font-semibold text-cream">Study Calendar</p>
                    </div>
                    <span className="rounded-full border border-parchment/15 bg-parchment/10 px-2.5 py-1 text-[11px] font-semibold text-parchment">
                      Tool view
                    </span>
                  </div>
                  <img
                    src="/images/study-calendar-tool.png"
                    alt="Study Calendar screenshot"
                    className="w-full rounded-[18px] border border-parchment/10"
                  />
                </div>
              </div>

              <p className="mt-5 text-xs text-steel text-center w-full md:pt-16">
                The Bonus Vault sits on top of the blueprint, so you are not just learning what to do. You have tools to actually do it.
              </p>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
}
