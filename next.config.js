/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  serverExternalPackages: ['unpdf'],
  // Bundle the gated sample-EE PDF with its API route so it's readable at runtime on Vercel
  outputFileTracingIncludes: {
    '/api/sample-ee': ['./private/**'],
  },
  async redirects() {
    return [
      { source: '/dump', destination: '/dashboard/dump', permanent: true },
      { source: '/planner', destination: '/dashboard/planner', permanent: true },
    ]
  },
}

module.exports = nextConfig
