/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.everlane.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
