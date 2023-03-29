import { ComponentStory, ComponentMeta } from '@storybook/react'

import Header from '.'

export default {
  title: 'common/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  categories: [
    {_id: "", name: "category1", displayedName: "カテゴリ1"},
    {_id: "", name: "category2", displayedName: "カテゴリ2"},
  ]
};
