import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { modes } from './modes'

initialize()

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: { viewports: modes } ,
    chromatic: {
      modes: modes['small']
    }
  },
  loaders: [mswLoader],
}

export default preview
