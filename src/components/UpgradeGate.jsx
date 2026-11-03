'use client'

import Link from 'next/link'
import CheckoutButton from './CheckoutButton'
import { PRICING } from '../config/paddle'

// Locked-state overlay for a paid tool/feature. Single tier now, so the moment
// a user hits this they get a clear, direct "buy" (opens Paddle checkout) — not
// a detour to the pricing page. `requiredTier` is accepted but ignored (kept so
// existing callers don't break).
export default function UpgradeGate({ requiredTier, toolName = 'This feature' }) {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-sm w-full text-center">
        <div className="w-12 h-12 rounded-full bg-navy/6 flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-navy/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h2 className="font-serif text-xl font-bold text-navy mb-2">Part of the full course</h2>
        <p className="text-sm text-ink-soft leading-relaxed mb-6">
          {toolName} comes with the full course — all 14 lessons, the writing tools, and the real
          32/34 essay marked line by line.
        </p>
        <CheckoutButton
          source="upgrade_gate"
          className="inline-block bg-navy text-cream text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-navy/90 transition-colors disabled:opacity-60"
        >
          Get the full course — ${PRICING.course.price} →
        </CheckoutButton>
        <p className="text-xs text-navy/40 mt-4">
          <Link href="/pricing" className="underline underline-offset-2 hover:text-navy">See what&rsquo;s included</Link>
          <span className="mx-1.5">·</span>
          30-day money-back guarantee
        </p>
      </div>
    </div>
  )
}
