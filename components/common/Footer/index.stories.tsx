import { ComponentStory, ComponentMeta } from '@storybook/react'
import Footer from '.';


export default {
  title: 'Organisms/Footer',
  component: Footer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  categories: [
    {id: "", name: "category1", displayedName: "カテゴリ1"},
    {id: "", name: "category2", displayedName: "カテゴリ2"},
  ]
};
