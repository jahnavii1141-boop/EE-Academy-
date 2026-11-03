'use client'

import Link from 'next/link'
import CheckoutButton from './CheckoutButton'
import { PRICING } from '../config/paddle'

export default function PostModuleGate() {
  return (
    <div className="my-10 rounded-2xl p-6 md:p-8 text-center"
      style={{ background: '#fff', border: '1px solid #e8e8e8', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <span className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide"
        style={{ background: '#f5f5f5', color: '#555' }}>
        Continue learning
      </span>
      <h3 className="text-xl font-bold mb-2" style={{ color: '#0a0a0a', letterSpacing: '-0.02em' }}>
        Unlock the full writing system
      </h3>
      <p className="text-sm leading-relaxed mb-6 max-w-sm mx-auto" style={{ color: '#888' }}>
        The rest of the guides cover the full research and writing process — including the exact
        framework behind a real 32/34 essay.
      </p>
      <CheckoutButton
        source="post_module_gate"
        className="inline-flex items-center text-sm font-semibold px-6 py-3 rounded-xl transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: '#0a0a0a', color: '#fff' }}
      >
        Get the full course — ${PRICING.course.price} →
      </CheckoutButton>
      <p className="text-xs mt-4" style={{ color: '#aaa' }}>
        <Link href="/pricing" className="underline underline-offset-2 hover:text-[#555]">See what&rsquo;s included</Link>
        <span className="mx-1.5">·</span>
        30-day money-back guarantee
      </p>
    </div>
  )
}
