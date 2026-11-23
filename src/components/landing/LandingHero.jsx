import ContinueOrStartCTA from './ContinueOrStartCTA'

// Minimal, centred hero in the spirit of a clean academic resource site:
// a large serif title, a short programme subtitle, and one understated action.
// Deliberately spare — the first impression is calm, not a sales pitch.
export default function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div
        className="absolute inset-0 opacity-[0.08] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 35%, #DDD9C4 0%, transparent 60%)' }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-28 sm:py-36 lg:py-40 text-center">
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-[1.05] mb-5">
          Extended Essay
        </h1>
        <p className="text-lg sm:text-xl text-steel tracking-wide mb-10">
          IB Diploma Programme
        </p>
        <ContinueOrStartCTA className="btn-primary-light inline-flex" />
      </div>
    </section>
  )
}
