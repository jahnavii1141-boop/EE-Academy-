import { useState, useEffect } from 'react'

const STORAGE_KEY = 'ee_email_gate_passed'

export default function EmailGate() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Don't show if already passed
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      // Trigger when ~45% through the page
      if (scrolled / total > 0.45) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    // TODO: wire to your email provider (Mailchimp, ConvertKit, etc.)
    console.log('Email captured:', email)
    sessionStorage.setItem(STORAGE_KEY, '1')
    setSubmitted(true)
    setTimeout(() => setVisible(false), 1800)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-cream rounded-2xl shadow-2xl max-w-md w-full mx-auto p-8 border border-navy/10">

        {/* Feather accent */}
        <img src="/feather-md.png" alt="" className="absolute top-4 right-4 h-20 w-auto opacity-10 pointer-events-none" />

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="font-serif text-xl font-bold text-navy mb-1">You're in.</p>
            <p className="text-ink-soft text-sm">Welcome to the EE Academy — enjoy the full page.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="inline-flex items-center bg-parchment text-navy text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
                Free access
              </span>
              <h2 className="font-serif text-2xl font-bold text-navy leading-tight mb-2">
                Want to see everything?
              </h2>
              <p className="text-ink-soft text-sm leading-relaxed">
                Drop your email for free access to the full page — plus EE tips and early-bird pricing straight to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="your@email.com"
                className="w-full bg-parchment/50 text-navy text-sm rounded-xl px-4 py-3 border border-navy/15 focus:outline-none focus:ring-2 focus:ring-navy/20 placeholder-navy/30 transition-all"
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button type="submit" className="w-full btn-primary text-center">
                Get Full Access — It's Free
              </button>
            </form>

            <p className="text-center text-xs text-ink-soft mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
