'use client'

import AnimateIn from './ui/AnimateIn'
import CheckoutButton from './CheckoutButton'
import { PRICING } from '../config/paddle'

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
              source="pricing_page"
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
