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
  '14-module EE curriculum',
  'EE Planner — week-by-week timeline',
  'Research Question Checker',
  'Essay editor with autosave',
  'Citation generator',
  'Lifetime access',
]

const METHOD_AI_FEATURES = [
  'Everything in Method',
  'AI Grade Scan — criteria-by-criteria',
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

    // Must be signed in so clerk_user_id is passed to Paddle custom_data.
    // Without it the webhook can't grant access.
    if (!userId) {
      window.location.href = `/sign-up?redirect_url=${encodeURIComponent('/pricing')}`
      return
    }

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
            customData: { clerk_user_id: userId },
            settings: {
              displayMode: 'overlay',
              theme: 'light',
              // Paddle appends ?_ptxn=txn_xxx — DashboardHome reads it and
              // calls /api/verify-payment as a backup if the webhook is slow.
              successUrl: `${window.location.origin}/dashboard/home`,
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
              <strong>Try it first.</strong> Modules 1–3 and 5 are completely free — no card, no login required.
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
              <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: '#aaa' }}>Method</p>
              <div className="flex items-end gap-1.5 mb-0.5">
                <span className="text-4xl font-serif font-bold text-navy">${PRICING.method.price}</span>
              </div>
              <p className="text-[12px] mb-5" style={{ color: '#aaa' }}>one-time · lifetime access</p>
              <ul className="space-y-2.5 mb-8">
                {METHOD_FEATURES.map((f, i) => <CheckItem key={i} text={f} />)}
              </ul>
            </div>
            <CheckoutButton
              href={PADDLE_CONFIG.basicUrl}
              priceId={PADDLE_CONFIG.basicPriceId}
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all border border-navy/20 text-navy hover:bg-navy hover:text-white"
            >
              Enroll in Method
            </CheckoutButton>
          </MotionDiv>

          {/* ── Method+AI (hero) ── */}
          <MotionDiv variants={staggerItem}
            className="rounded-2xl flex flex-col p-6 relative"
            style={{ background: '#0a0a0a' }}>
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-bold px-4 py-1.5
              rounded-full whitespace-nowrap"
              style={{ background: '#fff', color: '#0a0a0a', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
              Most Popular
            </span>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-widest mb-1 mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Method+AI</p>
              <div className="flex items-end gap-1.5 mb-0.5">
                <span className="text-4xl font-serif font-bold text-white">${PRICING.methodAI.price}</span>
              </div>
              <p className="text-[12px] mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>one-time · lifetime access</p>
              <p className="text-[11px] mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                or {PRICING.methodAI.installments.count} × ${PRICING.methodAI.installments.each}
              </p>
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
              Enroll in Method+AI
            </CheckoutButton>
          </MotionDiv>


        </StaggerContainer>

        {/* Squad nudge — one line, below the grid */}
        <AnimateIn delay={0.2}>
          <p className="text-center text-sm mt-5" style={{ color: '#aaa' }}>
            Buying with two friends?{' '}
            <Link href="/pricing#squad" className="underline underline-offset-2 hover:text-navy transition-colors">
              See The Squad →
            </Link>
          </p>
        </AnimateIn>

      </div>
    </section>
  )
}
