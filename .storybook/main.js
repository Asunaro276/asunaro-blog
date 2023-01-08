const path = require('path');

module.exports = {
  webpackFinal: async (config) => {
    config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve(__dirname, '../'),
  ]
    return config
  },
  "stories": [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
    "../pages/**/*.stories.mdx",
    "../pages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  "framework": "@storybook/react"
}