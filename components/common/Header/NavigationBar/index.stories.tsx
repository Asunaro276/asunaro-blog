import { ComponentStory, ComponentMeta } from '@storybook/react'
import { NavigationBar } from '.';

export default {
  title: 'molecules/NavigationBar',
  component: NavigationBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NavigationBar>;

const Template: ComponentStory<typeof NavigationBar> = (args) => <NavigationBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  logo: "LOGO",
  linkToId: [...Array(5)].map(() => "")
};