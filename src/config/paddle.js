// Paddle payment configuration
// Set NEXT_PUBLIC_PADDLE_CLIENT_TOKEN, NEXT_PUBLIC_PADDLE_ENVIRONMENT, and price IDs in .env.local

const DEFAULT_PADDLE_LINK = 'https://pay.paddle.com/checkout/your-default-product-id'

export const PADDLE_CONFIG = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'sandbox',
  defaultUrl: process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  basicUrl: process.env.NEXT_PUBLIC_PADDLE_BASIC_URL || process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  premiumUrl: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_URL || process.env.NEXT_PUBLIC_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  vendorId: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || '',
  basicPriceId: process.env.NEXT_PUBLIC_PADDLE_BASIC_PRICE_ID || '',
  premiumPriceId: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_PRICE_ID || '',
}

export const PRICING = {
  basic: {
    price: 89,
    earlyBird: 71,
    regular: 120,
    label: 'Basic',
    currency: '$',
  },
  premium: {
    price: 145,
    earlyBird: 145,
    regular: 195,
    label: 'Premium',
    currency: '$',
  },
}
