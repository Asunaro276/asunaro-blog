import { ComponentStory, ComponentMeta } from '@storybook/react'
import Pagination from '.';

export default {
  title: 'HomePage/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  dir: "",
  pageNumber: 3,
  totalCount: 83,
}