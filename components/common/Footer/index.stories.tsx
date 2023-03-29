import { ComponentStory, ComponentMeta } from '@storybook/react'
import Footer from '.';


export default {
  title: 'common/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

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
    {_id: "", name: "Home", displayedName: "Home"},
    {_id: "", name: "programming", displayedName: "プログラミング"},
    {_id: "", name: "business", displayedName: "ビジネス"},
    {_id: "", name: "data_sciense", displayedName: "データサイエンス"},
    {_id: "", name: "other", displayedName: "その他"},
  ]
};
