import { ComponentStory, ComponentMeta } from '@storybook/react'

import SideProfile from './SideProfile'

export default {
  title: 'Organisms/SideProfile',
  component: SideProfile,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SideProfile>;

const Template: ComponentStory<typeof SideProfile> = (args) => <SideProfile {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  pages: ["page1", "page2"],
  linkTo: ["", ""]
};
