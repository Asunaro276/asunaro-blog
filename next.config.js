/** @type {import('next').NextConfig} */
const rehypePrism = require("@mapbox/rehype-prism");
const withMDX = require('@next/mdx')({
extension: /\.mdx?$/,
options: {
  remarkPlugins: [],
  rehypePlugins: [rehypePrism]
  // If you use `MDXProvider`, uncomment the following line.
  // providerImportSource: "@mdx-js/react",
},
})
module.exports = withMDX({
// Append the default value with md extensions
pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.microcms-assets.io"],
  },
}