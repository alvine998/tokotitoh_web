/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
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
    BASE_URL_API_TOKOTITOH: 'http://103.245.39.242:8080'
  }
}

module.exports = nextConfig
