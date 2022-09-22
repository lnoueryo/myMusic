/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  env: {
    CATEGORY_URL: 'https://storage.googleapis.com/tech-blog-static/',
    BASE_URL: process.env.BASE_URL,
  },
}

module.exports = nextConfig
