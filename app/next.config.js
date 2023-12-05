/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

const version = 'prot5-pwa'
const isProd = process.env.NODE_ENV === 'production'


module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: false,
    skipWaiting: false,
    disable:  process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
  compress: true,

  typescript: {
    ignoreBuildErrors: true,
  }
})