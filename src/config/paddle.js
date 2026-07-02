// ─── Paddle payment configuration ────────────────────────────────────────────
// Single source of truth for all prices.
// Set env vars in .env.local and Vercel dashboard.
//
// PRICING (do not scatter prices elsewhere):
//   Standard  $79   one-time  → the full 14-module system, every guide & checklist
//   Premium   $149  one-time  → Standard + the tools, templates, SOPs & 32/34 breakdown
//
// IMPORTANT: these are the *displayed* prices. The amount actually charged comes
// from the Paddle price IDs below. Keep the Paddle dashboard products in sync:
//   basicPriceId   must be the $79 product
//   premiumPriceId must be the $149 product
// If they diverge, the page shows one price and checkout charges another.

const DEFAULT_PADDLE_LINK = 'https://pay.paddle.com/checkout/your-default-product-id'

export const PADDLE_CONFIG = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'sandbox',
  defaultUrl: process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  // Standard ($79)
  basicUrl: process.env.NEXT_PUBLIC_PADDLE_BASIC_URL || process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  basicPriceId: process.env.NEXT_PUBLIC_PADDLE_BASIC_PRICE_ID || '',
  // Premium ($149)
  premiumUrl: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_URL || process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  premiumPriceId: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_PRICE_ID || '',
  vendorId: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || '',
}

// ─── Single source of truth — all prices live here ───────────────────────────
export const PRICING = {
  method: {
    price: 79,
    label: 'Standard',
    slug: 'standard',
    tagline: 'The full system.',
    currency: '$',
  },
  methodAI: {
    price: 149,
    label: 'Premium',
    slug: 'premium',
    tagline: 'The complete system, with the tools.',
    currency: '$',
  },
}
