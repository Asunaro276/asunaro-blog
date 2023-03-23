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
    {id: "", name: "category1", displayedName: "カテゴリ1"},
    {id: "", name: "category2", displayedName: "カテゴリ2"},
  ]
};

export const Real = Template.bind({});
Real.args = {
  categories: [
    {id: "", name: "Home", displayedName: "Home"},
    {id: "", name: "programming", displayedName: "プログラミング"},
    {id: "", name: "business", displayedName: "ビジネス"},
    {id: "", name: "data_sciense", displayedName: "データサイエンス"},
    {id: "", name: "other", displayedName: "その他"},
  ]
};
