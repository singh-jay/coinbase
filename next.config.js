/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'api.qrserver.com'],
  },
}

module.exports = nextConfig
