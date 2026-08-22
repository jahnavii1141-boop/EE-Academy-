'use client'

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import AnimateIn from './ui/AnimateIn'
import { PADDLE_CONFIG, PRICING } from '../config/paddle'
import { getPaddle } from '../lib/paddle'

// ── The full course ($89) — single tier ──────────────────────────────────────
const COURSE_FEATURES = [
  '14-lesson EE curriculum',
  'Essay editor with autosave',
  'Citation generator',
  'EE Dump',
  'Supervisor Reply Drafter',
  'All templates & SOPs (downloadable)',
  '32/34 essay full breakdown',
]

function Check() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#0a0a0a" fillOpacity="0.08" />
      <path d="M5 8l2 2 4-4" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CheckItem({ text }) {
  return (
    <li className="flex items-start gap-2.5 text-sm" style={{ color: '#555' }}>
      <Check />
      {text}
    </li>
  )
}

// ── Checkout button (Paddle overlay or fallback URL) ─────────────────────────
function CheckoutButton({ href, priceId, children, className, style }) {
  const [isLoading, setIsLoading] = useState(false)
  const { userId } = useAuth()

  const handleCheckout = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      if (PADDLE_CONFIG.clientToken && priceId) {
        const Paddle = await getPaddle({
          environment: PADDLE_CONFIG.environment,
          clientToken: PADDLE_CONFIG.clientToken,
        })
        if (Paddle) {
          Paddle.Checkout.open({
            items: [{ priceId, quantity: 1 }],
            // Pass clerk_user_id if already signed in — webhook uses it to grant access instantly.
            // If not signed in, leave empty — verify-payment handles it after sign-up.
            customData: userId ? { clerk_user_id: userId } : {},
            settings: {
              displayMode: 'overlay',
              theme: 'light',
              // After payment → onboarding (Clerk middleware prompts sign-in if needed,
              // preserving the ?_ptxn param so verify-payment can grant access post sign-up).
              successUrl: `${window.location.origin}/onboarding?_ptxn={checkout.id}`,
            },
          })
          return
        }
      }
      window.location.href = href
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button type="button" onClick={handleCheckout} disabled={isLoading}
      className={className} style={style}>
      {isLoading ? 'Opening…' : children}
    </button>
  )
}

// ── Main Pricing section ─────────────────────────────────────────────────────
export default function Pricing() {
  return (
    <section id="pricing" className="py-16 px-6" style={{ background: '#fafafa' }}>
      <div className="max-w-md mx-auto">

        {/* ── The full course — single card ── */}
        <AnimateIn delay={0.05}>
          <div className="rounded-2xl border border-navy/10 bg-white p-7 flex flex-col">
            <h3 className="font-serif text-2xl font-bold text-navy mb-3">The full course</h3>

            <div className="flex items-end gap-1.5">
              <span className="text-4xl font-serif font-bold text-navy">${PRICING.course.price}</span>
            </div>
            <p className="text-[13px] text-navy/50 mt-1">one-time payment · lifetime access</p>
            <p className="text-[12px] text-navy/40 mt-1.5">
              Early-bird pricing — ${PRICING.course.price} for the first 50 students, then $99.
            </p>

            <ul className="space-y-2.5 my-7">
              {COURSE_FEATURES.map((f, i) => <CheckItem key={i} text={f} />)}
            </ul>

            <CheckoutButton
              href={PADDLE_CONFIG.basicUrl}
              priceId={PADDLE_CONFIG.basicPriceId}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all mt-auto"
              style={{ background: '#0a0a0a', color: '#fff' }}
            >
              Get the full course
            </CheckoutButton>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
