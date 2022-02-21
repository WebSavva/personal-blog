/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === 'production' ? '/personal-blog' : ''

module.exports = {
  reactStrictMode: true,
  basePath,
  assetPrefix: `${basePath}/`,

  serverRuntimeConfig: {
    rootDir: __dirname,
  },

  pageExtensions: ['tsx', 'ts'],
  
  images: {
    loader: 'akamai',
    path: '',
  }
}

process.env.ROOT_DIR = __dirname;
