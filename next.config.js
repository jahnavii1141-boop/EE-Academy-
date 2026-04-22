/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'theextendedessay.com' }],
        destination: 'https://www.theextendedessay.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
