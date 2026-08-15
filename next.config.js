/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  serverExternalPackages: ['unpdf'],
  // Bundle the gated sample-EE PDF with its API route so it's readable at runtime on Vercel
  outputFileTracingIncludes: {
    '/api/sample-ee': ['./private/**'],
  },
  // PostHog API calls can carry trailing slashes — don't 308 them
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // /dump is intentionally NOT redirected — it serves the public, no-account
      // EE Dump (app/dump/page.jsx). /dashboard/dump renders the same tool inside
      // the app shell for signed-in navigation.
      { source: '/planner', destination: '/dashboard/planner', permanent: true },
    ]
  },
  async rewrites() {
    // PostHog reverse proxy — events go through our own domain so adblockers
    // can't intercept them (they block ~20-30% of direct *.posthog.com calls).
    return [
      { source: '/ingest/static/:path*', destination: 'https://us-assets.i.posthog.com/static/:path*' },
      { source: '/ingest/:path*', destination: 'https://us.i.posthog.com/:path*' },
    ]
  },
  async headers() {
    // Safe defensive headers, enforced on every route.
    const securityHeaders = [
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      // CSP is staged below but NOT enabled by default: it must be tested
      // against Paddle checkout, Clerk auth, and Giphy embeds on a preview
      // deploy first, or it can break the live payment/login flow. To enable,
      // uncomment the line and verify those three flows.
      // { key: 'Content-Security-Policy', value: CSP },
    ]
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

// Candidate CSP — enable after verifying checkout/login/embeds on preview.
// eslint-disable-next-line no-unused-vars
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.paddle.com https://*.clerk.accounts.dev https://clerk.theextendedessay.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "frame-src 'self' https://*.paddle.com https://giphy.com https://*.clerk.accounts.dev https://challenges.cloudflare.com",
  "connect-src 'self' https://*.clerk.accounts.dev https://clerk.theextendedessay.com https://*.supabase.co https://api.paddle.com https://sandbox-api.paddle.com https://cdn.paddle.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ')

module.exports = nextConfig
