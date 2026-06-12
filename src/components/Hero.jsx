'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AnimateIn from './ui/AnimateIn'

function SimpleEmailCapture({ onClose }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) {
      setError('Enter a valid email to continue.')
      return
    }
    setLoading(true)
    localStorage.setItem('eeAcademy_freeEmail', trimmed)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'hero-start-free' }),
      })
    } catch { /* non-blocking */ }
    router.push('/dashboard')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <button onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-600 transition-colors text-lg leading-none">
          ✕
        </button>
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: '#bbb' }}>
          EE Academy
        </p>
        <h2 className="font-semibold mb-2" style={{ fontSize: 22, color: '#0a0a0a', letterSpacing: '-0.02em' }}>
          Start for free.
        </h2>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: '#888' }}>
          Access modules 1, 2, 3 and 5 free — no card, no commitment.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            placeholder="your@email.com"
            autoFocus
            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
            style={{ border: `1px solid ${error ? '#fca5a5' : '#e8e8e8'}`, color: '#0a0a0a', background: '#fafafa' }}
            onFocus={e => e.target.style.borderColor = '#0a0a0a'}
            onBlur={e => e.target.style.borderColor = error ? '#fca5a5' : '#e8e8e8'}
          />
          {error && <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
            style={{ background: '#0a0a0a', color: '#fff' }}>
            {loading ? 'Setting up…' : 'Get free access →'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function Hero() {
  const [showCapture, setShowCapture] = useState(false)
  const router = useRouter()

  const handleStartFree = () => {
    const hasEmail = typeof window !== 'undefined' && localStorage.getItem('eeAcademy_freeEmail')
    if (hasEmail) {
      router.push('/dashboard')
    } else {
      setShowCapture(true)
    }
  }

  return (
    <>
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
            <AnimateIn delay={0.1}>
              <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-cream leading-[1.1] mb-6">
                The EE without<br />
                <span className="gradient-text">the panic.</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <p className="text-lg text-steel leading-relaxed max-w-lg mb-8">
                Pick the help you want. We build the plan. We catch what your supervisor will.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <button onClick={handleStartFree} className="btn-primary-light">Start Free</button>
                <Link href="/pricing" className="btn-outline-light text-sm">See the system</Link>
              </div>
              <p className="text-sm text-steel/70 max-w-md">
                Modules 1, 2, 3, and 5 are free — start immediately.
              </p>
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
    {showCapture && <SimpleEmailCapture onClose={() => setShowCapture(false)} />}
    </>
  )
}
