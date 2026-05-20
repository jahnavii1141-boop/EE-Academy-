/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Keep pdf-parse as a native Node module — prevents bundler from
  // trying to resolve its internal test files at build time
  serverExternalPackages: ['pdf-parse'],
}

module.exports = nextConfig
