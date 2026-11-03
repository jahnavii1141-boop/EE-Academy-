'use client'

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import posthog from 'posthog-js'
import { PADDLE_CONFIG } from '../config/paddle'
import { getPaddle } from '../lib/paddle'

// Single source of truth for "buy the full course" — used by the pricing page
// AND every paywall gate, so the purchase path is identical everywhere.
// Opens the Paddle overlay; falls back to the hosted Paddle URL if the client
// token isn't available. Never hard-code the price id — it comes from
// PADDLE_CONFIG (env), so the charged amount can't drift from the displayed one.
export default function CheckoutButton({
  children = 'Get the full course',
  className = '',
  style,
  priceId = PADDLE_CONFIG.basicPriceId,
  href = PADDLE_CONFIG.basicUrl,
  source = 'unknown',
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { userId } = useAuth()

  const handleCheckout = async () => {
    if (isLoading) return
    setIsLoading(true)
    try { posthog.capture('checkout_start', { source, signed_in: !!userId }) } catch (e) { /* optional */ }
    try {
      if (PADDLE_CONFIG.clientToken && priceId) {
        const Paddle = await getPaddle({
          environment: PADDLE_CONFIG.environment,
          clientToken: PADDLE_CONFIG.clientToken,
        })
        if (Paddle) {
          Paddle.Checkout.open({
            items: [{ priceId, quantity: 1 }],
            // Pass clerk_user_id if signed in — webhook grants access instantly.
            // If not, leave empty — verify-payment grants it after sign-up.
            customData: userId ? { clerk_user_id: userId } : {},
            settings: {
              displayMode: 'overlay',
              theme: 'light',
              successUrl: `${window.location.origin}/onboarding?_ptxn={checkout.id}`,
            },
          })
          return
        }
      }
      if (href) window.location.href = href
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button type="button" onClick={handleCheckout} disabled={isLoading} className={className} style={style}>
      {isLoading ? 'Opening…' : children}
    </button>
  )
}
