let plugins = []

if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = import('@next/bundle-analyzer')
  plugins.push(withBundleAnalyzer)
}

const config = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    domains: ['images.microcms-assets.io'],
  },
}

module.exports = (_phase, { defaultConfig }) => {
  return plugins.reduce((acc, plugin) => plugin(acc), {
    ...defaultConfig,
    ...config,
  })
}
