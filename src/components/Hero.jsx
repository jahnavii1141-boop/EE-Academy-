import AnimateIn from './ui/AnimateIn'

export default function Hero() {
  return (
    <section className="bg-gradient-radial from-navy-light/40 via-navy to-navy-deep relative overflow-hidden">
      {/* Subtle decorative grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(221,217,196,1) 1px, transparent 1px), linear-gradient(90deg, rgba(221,217,196,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text content */}
          <div>
            <AnimateIn>
              <span className="inline-flex items-center bg-parchment/10 text-parchment text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-parchment/20 tracking-wide">
                ★ IB Extended Essay Programme
              </span>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-cream leading-[1.1] mb-6">
                Master Your<br />
                <span className="gradient-text">Extended Essay.</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <p className="text-lg text-steel leading-relaxed max-w-lg mb-8">
                The only structured programme designed specifically for IB students.
                Go from uncertain to confident — with expert guidance every step of the way.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#pricing" className="btn-primary-light">Start Learning Today</a>
                <a href="#curriculum" className="btn-outline-light">View Curriculum</a>
              </div>
            </AnimateIn>
          </div>

          {/* Right: Brand lockup — feather + typography */}
          <div className="flex justify-center lg:justify-end">
            <AnimateIn delay={0.2}>
              <div className="relative">
                {/* Soft glow behind lockup */}
                <div className="absolute inset-0 bg-parchment/8 blur-3xl rounded-full scale-90" />
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-float">
                  <img
                    src="/feather-hero.png"
                    alt="Quill feather"
                    className="h-[200px] sm:h-[280px] lg:h-[360px] w-auto drop-shadow-2xl"
                  />
                  <div className="font-serif text-cream text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] text-center sm:text-left">
                    <span className="block">The</span>
                    <span className="block">Extended</span>
                    <span className="block">Essay</span>
                    <span className="block">Academy</span>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>

        </div>
      </div>
    </section>
  )
}
