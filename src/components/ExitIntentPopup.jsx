'use client'

import { useState, useEffect } from 'react'
import { submitEmail, hasJoinedWaitlist, WAITLIST_COPY } from '../config/email'

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (hasJoinedWaitlist()) return

    let triggered = false

    // Desktop: mouse leaves viewport near top
    const handleMouseOut = (e) => {
      if (triggered) return
      if (e.clientY < 5 && e.relatedTarget === null) {
        triggered = true
        setVisible(true)
      }
    }

    // Mobile: after 60 seconds on page
    const timer = setTimeout(() => {
      if (!triggered && !hasJoinedWaitlist()) {
        triggered = true
        setVisible(true)
      }
    }, 60000)

    document.addEventListener('mouseout', handleMouseOut)
    return () => {
      document.removeEventListener('mouseout', handleMouseOut)
      clearTimeout(timer)
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    await submitEmail(email, 'exit-intent', ['waitlist'])
    setSubmitted(true)
    setTimeout(() => setVisible(false), 2000)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />
      <div className="relative bg-cream rounded-2xl shadow-2xl max-w-md w-full p-8 border border-navy/10">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-navy/30 hover:text-navy transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="font-serif text-xl font-bold text-navy mb-1">You're in!</p>
            <p className="text-navy/60 text-sm">{WAITLIST_COPY.successMessage}</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="inline-flex items-center bg-parchment text-navy text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
                Wait — before you go
              </span>
              <h2 className="font-serif text-2xl font-bold text-navy leading-tight mb-2">
                Don't miss your free EE resources
              </h2>
              <p className="text-navy/60 text-sm leading-relaxed">
                {WAITLIST_COPY.subline}. Join over 200+ IB students already on the waitlist.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder={WAITLIST_COPY.placeholder}
                className="w-full bg-parchment/50 text-navy text-sm rounded-xl px-4 py-3 border border-navy/15 focus:outline-none focus:ring-2 focus:ring-navy/20 placeholder-navy/30 transition-all"
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button type="submit" className="w-full btn-primary text-center">
                {WAITLIST_COPY.cta} — It's Free
              </button>
            </form>
            <p className="text-center text-xs text-navy/40 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
