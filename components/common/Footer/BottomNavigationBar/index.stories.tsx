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
    {_id: "", name: "category1", displayedName: "カテゴリ1"},
    {_id: "", name: "category2", displayedName: "カテゴリ2"},
  ]
};

export const Real = Template.bind({});
Real.args = {
  categories: [
    {_id: "", name: "Home", displayedName: "HOME"},
    {_id: "", name: "programming", displayedName: "プログラミング"},
    {_id: "", name: "business", displayedName: "ビジネス"},
    {_id: "", name: "math", displayedName: "数学"},
    {_id: "", name: "other", displayedName: "その他"},
  ]
};
