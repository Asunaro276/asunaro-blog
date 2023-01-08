import { ComponentStory, ComponentMeta } from '@storybook/react'

import SideProfile from '.'

export default {
  title: 'common/SideBar/SideProfile',
  component: SideProfile,
} as ComponentMeta<typeof SideProfile>;

const Template: ComponentStory<typeof SideProfile> = () => <SideProfile />;

export const Primary = Template.bind({});
