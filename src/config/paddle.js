// ─── Paddle payment configuration ────────────────────────────────────────────
// Single source of truth for the price.
// Set env vars in .env.local and Vercel dashboard.
//
// PRICING (do not scatter prices elsewhere):
//   The full course  $89  one-time  → the whole 14-lesson system, tools, templates
//
// IMPORTANT: this is the *displayed* price. The amount actually charged comes
// from the Paddle price ID below (NEXT_PUBLIC_PADDLE_BASIC_PRICE_ID = the $89
// product). If they diverge, the page shows one price and checkout charges
// another. (The old $149 Premium price still exists in Paddle for historical
// buyers; it's simply no longer referenced here — see paddle-webhook.)

const DEFAULT_PADDLE_LINK = 'https://pay.paddle.com/checkout/your-default-product-id'

export const PADDLE_CONFIG = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'sandbox',
  defaultUrl: process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  // The full course ($89) — env var name kept as _BASIC_ so the live price ID
  // set in Vercel/.env.local does not need to change.
  basicUrl: process.env.NEXT_PUBLIC_PADDLE_BASIC_URL || process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  basicPriceId: process.env.NEXT_PUBLIC_PADDLE_BASIC_PRICE_ID || '',
  vendorId: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || '',
}

// ─── Single source of truth — the price lives here ───────────────────────────
export const PRICING = {
  course: {
    price: 89,
    label: 'The full course',
    slug: 'course',
    currency: '$',
  },
}
