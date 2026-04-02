// Paddle payment configuration
// Replace placeholder URLs with real Paddle checkout links when ready
// Set VITE_PADDLE_DEFAULT_URL, VITE_PADDLE_BASIC_URL and VITE_PADDLE_PREMIUM_URL in .env.local

const DEFAULT_PADDLE_LINK = 'https://pay.paddle.com/checkout/your-default-product-id'

export const PADDLE_CONFIG = {
  defaultUrl: import.meta.env.VITE_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  basicUrl: import.meta.env.VITE_PADDLE_BASIC_URL || import.meta.env.VITE_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  premiumUrl: import.meta.env.VITE_PADDLE_PREMIUM_URL || import.meta.env.VITE_PADDLE_DEFAULT_URL || DEFAULT_PADDLE_LINK,
  vendorId: import.meta.env.VITE_PADDLE_VENDOR_ID || '',
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
