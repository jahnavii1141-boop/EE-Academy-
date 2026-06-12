'use client'

import { useState } from 'react'
import { submitEmail, hasJoinedWaitlist } from '../config/email'

export default function PostModuleGate() {
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
    await submitEmail(email, 'post-module-2', ['waitlist', 'early-bird'])
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="my-10 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center">
        <p className="font-semibold text-lg text-emerald-800 mb-1">You're in — check your inbox.</p>
        <p className="text-emerald-700/70 text-sm">We'll send the next modules and a guide to structuring your EE directly to you.</p>
      </div>
    )
  }

  return (
    <div className="my-10 rounded-2xl p-6 md:p-8"
      style={{ background: '#fff', border: '1px solid #e8e8e8', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <div className="max-w-md mx-auto text-center">
        <span className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide"
          style={{ background: '#f5f5f5', color: '#555' }}>
          Continue learning
        </span>
        <h3 className="text-xl font-bold mb-2" style={{ color: '#0a0a0a', letterSpacing: '-0.02em' }}>
          Get the rest of the system in your inbox
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#888' }}>
          Drop your email and we'll send you the next free modules plus a breakdown of how the 32/34 essay was actually structured.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            placeholder="your@email.com"
            className="flex-1 text-sm rounded-xl px-4 py-3 focus:outline-none transition-all"
            style={{ border: `1px solid ${error ? '#fca5a5' : '#e0e0e0'}`, background: '#fafafa', color: '#0a0a0a' }}
          />
          <button
            type="submit"
            disabled={loading}
            className="text-sm font-semibold px-5 py-3 rounded-xl whitespace-nowrap transition-all"
            style={{ background: loading ? '#f0f0f0' : '#0a0a0a', color: loading ? '#aaa' : '#fff' }}
          >
            {loading ? 'Sending…' : 'Send me the modules'}
          </button>
        </form>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    </div>
  )
}
