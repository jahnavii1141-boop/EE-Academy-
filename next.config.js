/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  serverExternalPackages: ['unpdf'],
  async redirects() {
    return [
      { source: '/dump', destination: '/dashboard/dump', permanent: true },
      { source: '/planner', destination: '/dashboard/planner', permanent: true },
    ]
  },
}

module.exports = nextConfig
