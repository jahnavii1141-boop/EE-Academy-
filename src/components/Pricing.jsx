import { motion } from 'framer-motion'
import { useState } from 'react'
import AnimateIn, { StaggerContainer, staggerItem } from './ui/AnimateIn'
import { PADDLE_CONFIG, PRICING } from '../config/paddle'
import { getPaddle } from '../lib/paddle'

const MotionDiv = motion.div

const FEATURES_BASIC = [
  'Extended Essay Resource Lab — all 14 modules',
  'Study Calendar tool',
  'Citation quick-reference guide',
]

const FEATURES_PREMIUM = [
  'Everything in Basic',
  'EE Dump Workspace (interactive tool)',
  'Source Tracker (coming soon)',
  'EE Planner (timeline tool)',
  'All 12 AI copy-paste prompts',
  'Full 32/34 EE analysis with real commentary',
  'All templates & SOPs (downloadable)',
]

function CheckItem({ text }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-ink-soft">
      <svg className="w-4 h-4 text-navy flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      {text}
    </li>
  )
}

function CheckoutButton({ tier, href, priceId, children, className }) {
  const [isLoading, setIsLoading] = useState(false)

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
            settings: {
              displayMode: 'overlay',
              theme: 'light',
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
    <button type="button" onClick={handleCheckout} disabled={isLoading} className={className}>
      {isLoading ? 'Opening checkout...' : children}
    </button>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-cream py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimateIn>
          <h2 className="section-heading">Pricing Plans</h2>
          <p className="section-subheading">
            One-time payment. Lifetime access. No hidden fees.
          </p>
        </AnimateIn>

        {/* Free tier callout */}
        <AnimateIn delay={0.05}>
          <div className="mb-6 rounded-2xl border border-navy/10 bg-parchment/60 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0">FREE</span>
            <div>
              <p className="text-sm font-semibold text-navy">Start for free — no card required</p>
              <p className="text-xs text-ink-soft mt-0.5">Includes Modules 1, 2, 3 & 5 in full + the EE Planner tool</p>
            </div>
            <a href="/course/module-1" className="sm:ml-auto text-xs font-semibold text-navy underline underline-offset-2 flex-shrink-0">
              Start free →
            </a>
          </div>
        </AnimateIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-4 items-stretch">
          {/* Basic */}
          <MotionDiv
            variants={staggerItem}
            className="bento-card bg-card-2 flex flex-col justify-between hover:-translate-y-1 border border-navy/8"
          >
            <div>
              <p className="text-xs font-semibold text-navy/50 uppercase tracking-widest mb-3">Basic</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-serif font-bold text-navy">${PRICING.basic.price}</span>
              </div>
              <p className="text-xs text-ink-soft mb-6">One-time payment · Lifetime access</p>
              <ul className="space-y-3 mb-8">
                {FEATURES_BASIC.map((f, i) => <CheckItem key={i} text={f} />)}
              </ul>
            </div>
            <CheckoutButton
              tier="basic"
              href={PADDLE_CONFIG.basicUrl}
              priceId={PADDLE_CONFIG.basicPriceId}
              className="block w-full text-center btn-primary disabled:opacity-70"
            >
              Enroll in Basic
            </CheckoutButton>
          </MotionDiv>

          {/* Premium */}
          <MotionDiv
            variants={staggerItem}
            className="bento-card bg-parchment flex flex-col justify-between border-2 border-navy/15 relative hover:-translate-y-1"
          >
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-navy text-cream text-xs font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
              Most Popular
            </span>
            <div>
              <p className="text-xs font-semibold text-navy/50 uppercase tracking-widest mb-3 mt-3">Premium</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-serif font-bold text-navy">${PRICING.premium.price}</span>
              </div>
              <p className="text-xs text-ink-soft mb-6">One-time payment · Lifetime access</p>
              <ul className="space-y-3 mb-8">
                {FEATURES_PREMIUM.map((f, i) => <CheckItem key={i} text={f} />)}
              </ul>
            </div>
            <CheckoutButton
              tier="premium"
              href={PADDLE_CONFIG.premiumUrl}
              priceId={PADDLE_CONFIG.premiumPriceId}
              className="block w-full text-center btn-primary disabled:opacity-70"
            >
              Enroll in Premium
            </CheckoutButton>
          </MotionDiv>
        </StaggerContainer>
      </div>
    </section>
  )
}
