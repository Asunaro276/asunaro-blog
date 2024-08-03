import type { Meta, StoryObj } from '@storybook/react'

import SideProfile from './index.astro'

const meta: Meta<typeof SideProfile> = {
  component: SideProfile,
}

export default meta
type Story = StoryObj<typeof SideProfile>

export const Primary: Story = {
  render: () => <SideProfile />,
}
