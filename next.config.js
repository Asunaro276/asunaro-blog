const withPlugins = require('next-compose-plugins')
let plugins = []

const withExportImages = require('next-export-optimize-images')
plugins.push(withExportImages)
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')
  plugins.push(withBundleAnalyzer)
}

module.exports = withPlugins(
  plugins,
  {
    // pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    reactStrictMode: true,
    images: {
      domains: ["images.microcms-assets.io"],
    },
  }
)
