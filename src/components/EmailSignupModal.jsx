'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { X, ArrowRight, Sparkles } from 'lucide-react'

const STORAGE_KEY = 'ee_signup_shown'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Homepage email popup. ONE working path (2026-07 rebuild): capture the lead,
// then hand straight to Clerk signup with the email prefilled. No inline Clerk
// hook dependency — the old version silently no-op'd when Clerk wasn't loaded
// yet, losing submissions with zero feedback (caught on a session recording).
export default function EmailSignupModal() {
  const { isSignedIn } = useUser()
  const router = useRouter()

  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  useEffect(() => {
    if (isSignedIn) return
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => {
      setVisible(true)
      sessionStorage.setItem(STORAGE_KEY, '1')
    }, 5000)
    return () => clearTimeout(timer)
  }, [isSignedIn])

  const close = () => setVisible(false)

  const submit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setError('Enter a valid email address.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setError('')
    // Capture the lead. A subscribe hiccup (network/500) must NOT block signup,
    // but a 400 (invalid/disposable email) surfaces as a real error.
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'homepage-modal' }),
      })
      if (res.status === 400) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Please use a valid, non-temporary email.')
        setStatus('error')
        return
      }
    } catch {
      /* network issue — still send them to signup, don't lose them */
    }
    setStatus('success')
    router.push(`/sign-up?email=${encodeURIComponent(trimmed)}`)
  }

  if (!visible || isSignedIn) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />

      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#fff' }}>
        <div className="px-8 pt-8 pb-6 relative">
          <button onClick={close}
            className="absolute top-5 right-5 p-1.5 rounded-lg transition-all"
            style={{ color: '#ccc' }}
            onMouseEnter={e => e.currentTarget.style.color = '#2E3250'}
            onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
            <X size={16} />
          </button>

          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: '#2E3250' }}>
              <Sparkles size={12} color="#fff" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#aaa' }}>
              EE Academy
            </span>
          </div>
          <h2 className="font-semibold mb-2" style={{ fontSize: 22, color: '#2E3250', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Free access to your<br />EE workspace.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
            Five free missions, the planner, citation tools, and the EE Mentor. Enter your email to create your free account.
          </p>
        </div>

        <div className="px-8 pb-8">
          <form onSubmit={submit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); if (status === 'error') { setStatus('idle'); setError('') } }}
              placeholder="your@email.com"
              autoFocus
              required
              disabled={status === 'loading' || status === 'success'}
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors disabled:opacity-60"
              style={{ border: `1px solid ${status === 'error' ? '#fca5a5' : '#e8e8e8'}`, color: '#2E3250', background: '#F4F3E8' }}
              onFocus={e => e.target.style.borderColor = '#2E3250'}
              onBlur={e => e.target.style.borderColor = status === 'error' ? '#fca5a5' : '#e8e8e8'}
            />
            {error && <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>}
            <button type="submit" disabled={status === 'loading' || status === 'success' || !email}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
              style={{ background: '#2E3250', color: '#fff' }}>
              {status === 'loading' ? (
                <><span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" /> Setting up…</>
              ) : status === 'success' ? (
                <>Redirecting…</>
              ) : (
                <>Get free access <ArrowRight size={14} /></>
              )}
            </button>
            <p className="text-center text-xs" style={{ color: '#ccc' }}>
              No payment needed. No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>

        <div className="px-8 py-4 flex items-center gap-6" style={{ borderTop: '1px solid #f0f0f0', background: '#F4F3E8' }}>
          {['5 free missions', 'EE planner', 'Research tools'].map(item => (
            <div key={item} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#16a34a' }} />
              <span className="text-[10px] font-medium" style={{ color: '#888' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
