import { ComponentStory, ComponentMeta } from '@storybook/react'
import { NavigationBar } from '.';

export default {
  title: 'common/Header/NavigationBar',
  component: NavigationBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NavigationBar>;

const Template: ComponentStory<typeof NavigationBar> = (args) => <NavigationBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  categories: [
  ]
};