'use client'

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import AnimateIn, { StaggerContainer, staggerItem } from './ui/AnimateIn'
import { PADDLE_CONFIG, PRICING } from '../config/paddle'
import { getPaddle } from '../lib/paddle'
import { motion } from 'framer-motion'

const MotionDiv = motion.div

// ── Features per tier ────────────────────────────────────────────────────────
const METHOD_FEATURES = [
  '14-lesson EE curriculum',
  'EE Planner — week-by-week timeline',
  'Research Question Checker',
  'Essay editor with autosave',
  'Citation generator',
  'Yearly access',
]

const METHOD_AI_FEATURES = [
  'Everything in Standard',
  'Polish Pass — language & argument tightening',
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

function CheckItem({ text, light }) {
  return (
    <li className="flex items-start gap-2.5 text-sm" style={{ color: light ? 'rgba(255,255,255,0.85)' : '#555' }}>
      {light ? (
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.15)" />
          <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : <Check />}
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
      <div className="max-w-5xl mx-auto">

        {/* Free tier nudge */}
        <AnimateIn delay={0.0}>
          <div className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5
            flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0">FREE</span>
            <p className="text-sm text-emerald-800">
              <strong>Try it first.</strong> Your first missions are completely free — start immediately.
            </p>
            <Link href="/course/module-1"
              className="sm:ml-auto text-xs font-semibold text-emerald-700 underline underline-offset-2 flex-shrink-0 whitespace-nowrap">
              Start free →
            </Link>
          </div>
        </AnimateIn>

        {/* 2-column grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-4 items-stretch max-w-2xl mx-auto">

          {/* ── Method ── */}
          <MotionDiv variants={staggerItem}
            className="rounded-2xl border border-navy/10 bg-white flex flex-col p-6">
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Standard</p>
              <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2"
                style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }}>
                Early bird offer
              </span>
              <div className="flex items-end gap-1.5 mb-0.5">
                <span className="text-4xl font-serif font-bold text-navy">${PRICING.method.price}</span>
              </div>
              <p className="text-[12px] mb-5" style={{ color: '#aaa' }}>yearly access</p>
              <ul className="space-y-2.5 mb-8">
                {METHOD_FEATURES.map((f, i) => <CheckItem key={i} text={f} />)}
              </ul>
            </div>
            <CheckoutButton
              href={PADDLE_CONFIG.basicUrl}
              priceId={PADDLE_CONFIG.basicPriceId}
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all border border-navy/20 text-navy hover:bg-navy hover:text-white"
            >
              Get the full system
            </CheckoutButton>
          </MotionDiv>

          {/* ── Premium (hero) ── */}
          <MotionDiv variants={staggerItem}
            className="rounded-2xl flex flex-col p-6 relative"
            style={{ background: '#0a0a0a' }}>
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-bold px-4 py-1.5
              rounded-full whitespace-nowrap"
              style={{ background: '#fff', color: '#0a0a0a', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
              Most Popular
            </span>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-widest mb-2 mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Premium</p>
              <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2"
                style={{ background: 'rgba(254,243,199,0.15)', color: 'rgba(253,230,138,0.9)', border: '1px solid rgba(253,230,138,0.25)' }}>
                Early bird offer
              </span>
              <div className="flex items-end gap-1.5 mb-0.5">
                <span className="text-4xl font-serif font-bold text-white">${PRICING.methodAI.price}</span>
              </div>
              <p className="text-[12px] mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>yearly access</p>
              <ul className="space-y-2.5 mb-8">
                {METHOD_AI_FEATURES.map((f, i) => <CheckItem key={i} text={f} light />)}
              </ul>
            </div>
            <CheckoutButton
              href={PADDLE_CONFIG.premiumUrl}
              priceId={PADDLE_CONFIG.premiumPriceId}
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#fff', color: '#0a0a0a' }}
            >
              Get Premium
            </CheckoutButton>
          </MotionDiv>


        </StaggerContainer>

      </div>
    </section>
  )
}
