import { useState } from 'react'
import { submitEmail, hasJoinedWaitlist, WAITLIST_COPY } from '../config/email'

export default function PostModuleGate() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(hasJoinedWaitlist)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    await submitEmail(email, 'post-module-2', ['waitlist', 'early-bird'])
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="my-10 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center">
        <p className="font-serif text-lg font-bold text-emerald-800 mb-1">You're on the list!</p>
        <p className="text-emerald-700/70 text-sm">{WAITLIST_COPY.successMessage}</p>
      </div>
    )
  }

  return (
    <div className="my-10 rounded-2xl border-2 border-navy/10 bg-parchment/40 p-6 md:p-8">
      <div className="text-center max-w-md mx-auto">
        <span className="inline-flex items-center bg-navy/8 text-navy text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
          Enjoying the free modules?
        </span>
        <h3 className="font-serif text-xl font-bold text-navy mb-2">
          {WAITLIST_COPY.headline}
        </h3>
        <p className="text-navy/60 text-sm leading-relaxed mb-5">
          {WAITLIST_COPY.subline}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            placeholder={WAITLIST_COPY.placeholder}
            className="flex-1 bg-cream text-navy text-sm rounded-xl px-4 py-3 border border-navy/15 focus:outline-none focus:ring-2 focus:ring-navy/20 placeholder-navy/30 transition-all"
          />
          <button type="submit" className="btn-primary text-sm whitespace-nowrap">
            {WAITLIST_COPY.cta}
          </button>
        </form>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        <p className="text-navy/40 text-xs mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  )
}
