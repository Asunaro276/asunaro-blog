import { ComponentStory, ComponentMeta } from '@storybook/react'
import NavigationBar from './NavigationBar';

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
  pages: [...Array(5)].map((v, k) => `Option${k}`),
  linkTo: [...Array(5)].map(() => "")
};