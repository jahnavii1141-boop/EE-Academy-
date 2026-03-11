import { Link } from 'react-router-dom'
import AnimateIn from './ui/AnimateIn'

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center">
      {/* Dark navy base */}
      <div className="absolute inset-0 bg-navy-deep" />

      {/* Radial vignette — bright centre fading to deep edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 40% 50%, rgba(30,42,70,0.0) 0%, rgba(10,16,35,0.85) 65%, rgba(5,10,22,1) 100%)',
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(221,217,196,1) 1px, transparent 1px), linear-gradient(90deg, rgba(221,217,196,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Soft warm glow behind text */}
      <div
        className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #DDD9C4 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text content */}
          <div>
            <AnimateIn>
              <span className="inline-flex items-center bg-parchment/10 text-parchment text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-parchment/20 tracking-wide">
                ★ Premium Extended Essay Course
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
                <Link to="/dashboard" className="btn-primary-light">Access Class Now</Link>
                <Link to="/curriculum" className="btn-outline-light">View Curriculum</Link>
              </div>
            </AnimateIn>
          </div>

          {/* Right: Brand lockup — feather + typography */}
          <div className="flex justify-center lg:justify-end">
            <AnimateIn delay={0.2}>
              <div className="relative">
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
