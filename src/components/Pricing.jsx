import { Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimateIn, { StaggerContainer, staggerItem } from './ui/AnimateIn'

const FEATURES_BASIC = [
  'Full course access (24 hours)',
  '5 guided writing exercises',
  'Downloadable essay templates',
  'Community forum access',
  'Certificate of completion',
]

const FEATURES_PRO = [
  'Everything in Basic',
  '1-on-1 essay feedback session (60 min)',
  'Written feedback on your draft',
  'Private student Slack group',
  'Viva voce preparation session',
  'Lifetime updates',
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

export default function Pricing() {
  return (
    <section id="pricing" className="bg-cream py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimateIn>
          <h2 className="section-heading">Simple, Honest Pricing</h2>
          <p className="section-subheading">
            One-time payment. Lifetime access. No hidden fees.
          </p>
        </AnimateIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-4 items-stretch">
          {/* Basic */}
          <motion.div
            variants={staggerItem}
            className="bento-card bg-card-2 flex flex-col justify-between hover:-translate-y-1 border border-navy/8"
          >
            <div>
              <p className="text-xs font-semibold text-navy/50 uppercase tracking-widest mb-3">Basic</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-5xl font-serif font-bold text-navy">$97</span>
                <span className="text-ink-soft text-sm mb-2">one-time</span>
              </div>
              <ul className="space-y-3 mb-8">
                {FEATURES_BASIC.map((f, i) => <CheckItem key={i} text={f} />)}
              </ul>
            </div>
            <a href="#" className="block text-center btn-primary">Enroll in Basic</a>
          </motion.div>

          {/* Pro */}
          <motion.div
            variants={staggerItem}
            className="bento-card bg-parchment flex flex-col justify-between border-2 border-navy/15 relative hover:-translate-y-1"
          >
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-navy text-cream text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
              Most Popular
            </span>
            <div>
              <p className="text-xs font-semibold text-navy/50 uppercase tracking-widest mb-3 mt-3">Pro</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-5xl font-serif font-bold text-navy">$197</span>
                <span className="text-ink-soft text-sm mb-2">one-time</span>
              </div>
              <ul className="space-y-3 mb-8">
                {FEATURES_PRO.map((f, i) => <CheckItem key={i} text={f} />)}
              </ul>
            </div>
            <a href="#" className="block text-center btn-primary">Enroll in Pro</a>
          </motion.div>
        </StaggerContainer>

        <AnimateIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-ink-soft text-sm max-w-md mx-auto flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-navy/50 flex-shrink-0" />
              <span>
                <span className="font-semibold text-navy">30-day money-back guarantee.</span>{' '}
                Not satisfied? Email us and we'll refund you in full — no questions asked.
              </span>
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
