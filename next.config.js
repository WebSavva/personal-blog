/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    rootDir: __dirname,
  },
  images: {
    domains: ['source.unsplash.com'],
  }
}
