/** @type {import('next').NextConfig} */
const withExportImages = require('next-export-optimize-images')
module.exports = withExportImages({
// Append the default value with md extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    domains: ["images.microcms-assets.io"],
  },
})
