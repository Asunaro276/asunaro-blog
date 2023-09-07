import { ComponentStory, ComponentMeta } from '@storybook/react'

import { BottomNavigationBar } from '.'

export default {
  title: 'common/Footer/BottomNavigationBar',
  component: BottomNavigationBar,
} as ComponentMeta<typeof BottomNavigationBar>;

const Template: ComponentStory<typeof BottomNavigationBar> = (args) => <BottomNavigationBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  categories: [
  ]
};

