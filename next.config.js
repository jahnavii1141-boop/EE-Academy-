/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.theextendedessay.com' }],
        destination: 'https://theextendedessay.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
