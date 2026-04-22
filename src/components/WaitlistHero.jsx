'use client'

import { useState } from 'react'
import { submitEmail, hasJoinedWaitlist, WAITLIST_COPY } from '../config/email'

export default function WaitlistHero() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(hasJoinedWaitlist)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    setLoading(true)
    try {
      await submitEmail(email, 'hero', ['waitlist', 'early-bird'])
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="mt-6 flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/20 rounded-xl px-4 py-3">
        <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <p className="text-emerald-300 text-sm">{WAITLIST_COPY.successMessage}</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <p className="text-steel text-sm mb-3">
        {WAITLIST_COPY.subline}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setError('') }}
          placeholder={WAITLIST_COPY.placeholder}
          className="flex-1 bg-white/5 text-cream text-sm rounded-xl px-4 py-3 border border-parchment/15 focus:outline-none focus:ring-2 focus:ring-parchment/25 placeholder-steel/50 transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-parchment text-navy font-semibold text-sm px-5 py-3 rounded-xl hover:bg-cream transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? 'Joining...' : WAITLIST_COPY.cta}
        </button>
      </form>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  )
}
