/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  serverRuntimeConfig: {
    rootDir: __dirname,
  },

  pageExtensions: ['tsx', 'ts'],
  
  images: {
    domains: ['source.unsplash.com'],
  }
}

process.env.ROOT_DIR = __dirname;
