const withPlugins = require('next-compose-plugins')
const withExportImages = require('next-export-optimize-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withPlugins(
  [
    withExportImages,
    withBundleAnalyzer,
  ],
  {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    reactStrictMode: true,
    images: {
      domains: ["images.microcms-assets.io"],
    },
  }
)
