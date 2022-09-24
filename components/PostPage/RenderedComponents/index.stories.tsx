import { ComponentStory, ComponentMeta } from '@storybook/react'
import { RenderedHeadings } from '.';


export default {
  title: 'molecules/RenderedHeadings',
  component: RenderedHeadings,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RenderedHeadings>;

const Template: ComponentStory<typeof RenderedHeadings> = (args) => <RenderedHeadings {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "text",
  tag: "h1"
};
