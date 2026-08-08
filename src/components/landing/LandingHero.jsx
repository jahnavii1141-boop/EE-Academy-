import ContinueOrStartCTA from './ContinueOrStartCTA'

// One hero. One button, and it opens a lesson. No Google button, no second CTA,
// no "free to start" line — the open lessons make that argument themselves.
export default function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div
        className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[380px] rounded-full opacity-[0.08] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #DDD9C4 0%, transparent 70%)' }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 sm:py-28">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-[1.1] mb-6">
          A 32/34 Extended Essay, taken apart lesson by lesson.
        </h1>
        <p className="text-lg text-steel leading-relaxed max-w-xl mb-8">
          A step-by-step course through the whole EE — choosing a question, reading, structuring,
          drafting, the reflections. Every stage traced through an essay that scored 32/34.
        </p>
        <ContinueOrStartCTA className="btn-primary-light inline-flex" />
        <p className="text-sm text-steel/70 mt-4">
          First 5 lessons are open. No account needed to read them.
        </p>
      </div>
    </section>
  )
}
