// ─── Paddle payment configuration ────────────────────────────────────────────
// Single source of truth for all prices.
// Set env vars in .env.local and Vercel dashboard.
//
// PRICING (locked at launch — do not scatter prices elsewhere):
//   Method        $89   one-time  → 14 modules + planner + RQ Checker + essay editor
//   Method+AI    $179   one-time  → Method + AI Grade Scan + Polish Pass
//   Method+Me    $497   one-time  → Method+AI + 3 founder sessions (or 3 × $179)
//
// Squad and School are NOT in the main grid.
//   Squad  → /pricing#squad  (link below the grid)
//   School → /school-license  (footer link, own page)

const DEFAULT_PADDLE_LINK = 'https://pay.paddle.com/checkout/your-default-product-id'

export const PADDLE_CONFIG = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'sandbox',
  defaultUrl: process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  // Method ($89)
  basicUrl: process.env.NEXT_PUBLIC_PADDLE_BASIC_URL || process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  basicPriceId: process.env.NEXT_PUBLIC_PADDLE_BASIC_PRICE_ID || '',
  // Method+AI ($179)
  premiumUrl: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_URL || process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  premiumPriceId: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_PRICE_ID || '',
  // Method+Me ($497) — handled via Calendly/manual until volume warrants Paddle product
  mentorUrl: process.env.NEXT_PUBLIC_PADDLE_MENTOR_URL || process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  mentorPriceId: process.env.NEXT_PUBLIC_PADDLE_MENTOR_PRICE_ID || '',
  vendorId: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || '',
}

// ─── Single source of truth — all prices live here ───────────────────────────
export const PRICING = {
  method: {
    price: 89,
    label: 'Method',
    slug: 'method',
    tagline: 'The full system.',
    currency: '$',
  },
  methodAI: {
    price: 179,
    label: 'Method+AI',
    slug: 'method-ai',
    tagline: 'The system + examiner-grade AI.',
    currency: '$',
    // 3-payment option: 3 × $63
    installments: { count: 3, each: 63 },
  },
  methodMe: {
    price: 497,
    label: 'Method+Me',
    slug: 'method-me',
    tagline: 'The system + the founder.',
    currency: '$',
    // 3-payment option: 3 × $179
    installments: { count: 3, each: 179 },
  },
}
