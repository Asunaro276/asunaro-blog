let plugins = []

const withExportImages = require('next-export-optimize-images')
plugins.push(withExportImages)
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')
  plugins.push(withBundleAnalyzer)
}

const config = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    domains: ["images.microcms-assets.io"],
  },
}

module.exports = (_phase, { defaultConfig }) => {
  return plugins.reduce((acc, plugin) => plugin(acc), {
    ...defaultConfig,
    ...config,
  })
}
