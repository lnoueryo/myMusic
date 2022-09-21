/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  env: {
    CATEGORY_URL: 'https://storage.googleapis.com/tech-blog-static/',
  },
}

module.exports = nextConfig
