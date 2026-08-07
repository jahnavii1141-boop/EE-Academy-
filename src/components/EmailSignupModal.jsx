'use client'

import { useState, useEffect } from 'react'
import { useUser, SignUpButton } from '@clerk/nextjs'
import { X, ArrowRight, Sparkles } from 'lucide-react'

const STORAGE_KEY = 'ee_signup_shown'

// Homepage nudge popup (2026-07 least-friction rebuild). Shows once after 5s.
// Its CTA opens Clerk's native signup modal (Continue with Google in one click,
// or email) right on the page — no email-collection step, no /sign-up hop,
// straight to the dashboard after. Lead capture happens via the Clerk
// user.created webhook, so we still get every real signup on the list.
export default function EmailSignupModal() {
  const { isSignedIn } = useUser()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isSignedIn) return
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => {
      setVisible(true)
      sessionStorage.setItem(STORAGE_KEY, '1')
    }, 5000)
    return () => clearTimeout(timer)
  }, [isSignedIn])

  if (!visible || isSignedIn) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setVisible(false)} />

      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#fff' }}>
        <div className="px-8 pt-8 pb-7 relative">
          <button onClick={() => setVisible(false)}
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
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#888' }}>
            Five free missions, the planner, citation tools, and the EE Mentor. Create your free account in one click.
          </p>

          <SignUpButton mode="modal" forceRedirectUrl="/dashboard/home">
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#2E3250', color: '#fff' }}>
              Get started free <ArrowRight size={14} />
            </button>
          </SignUpButton>
          <p className="text-center text-xs mt-3" style={{ color: '#ccc' }}>
            No payment needed. No spam. Unsubscribe anytime.
          </p>
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
