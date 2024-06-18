/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      };
    }
    config.plugins.push(new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }))
    return config
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'localhost']
  },
  env: {
    BASE_URL_API_TOKOTITOH: 'https://api.tokotitoh.co.id'
  }
}

module.exports = nextConfig
