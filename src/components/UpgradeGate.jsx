'use client'

import Link from 'next/link'

// Shows a locked state overlay when user doesn't have the required tier
// requiredTier: 'standard' | 'premium'
export default function UpgradeGate({ requiredTier = 'standard', toolName = 'this feature' }) {
  const isPremium = requiredTier === 'premium'

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-sm w-full text-center">
        <div className="w-12 h-12 rounded-full bg-navy/6 flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-navy/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h2 className="font-serif text-xl font-bold text-navy mb-2">
          {isPremium ? 'Premium feature' : 'Full access required'}
        </h2>
        <p className="text-sm text-ink-soft leading-relaxed mb-6">
          {isPremium
            ? `${toolName} is included in the Premium plan — upgrade to unlock the full toolkit.`
            : `${toolName} requires a Standard or Premium plan. Enroll to get access to all 14 modules.`}
        </p>
        <Link
          href="/pricing"
          className="inline-block bg-navy text-cream text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-navy/90 transition-colors"
        >
          {isPremium ? 'Upgrade to Premium →' : 'View Plans →'}
        </Link>
        <p className="text-xs text-navy/30 mt-4">30-day money-back guarantee</p>
      </div>
    </div>
  )
}
