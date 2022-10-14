import { ComponentStory, ComponentMeta } from '@storybook/react'

import { BottomNavigationBar } from '.'

export default {
  title: 'molecules/BottomNavigationBar',
  component: BottomNavigationBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof BottomNavigationBar>;

const Template: ComponentStory<typeof BottomNavigationBar> = (args) => <BottomNavigationBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  categories: [
    {id: "", name: "category1", displayedName: "カテゴリ1"},
    {id: "", name: "category2", displayedName: "カテゴリ2"},
  ]
};
