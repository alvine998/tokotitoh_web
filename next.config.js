/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'localhost']
  },
  env: {
    BASE_URL_API_TOKOTITOH: 'http://103.245.39.242:8080'
  }
}

module.exports = nextConfig
