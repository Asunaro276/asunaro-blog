import { ComponentStory, ComponentMeta } from '@storybook/react'
import { RenderedElement } from './RenderedElement';


export default {
  title: 'molecules/RenderedElement',
  component: RenderedElement,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RenderedElement>;

const Template: ComponentStory<typeof RenderedElement> = (args) => <RenderedElement {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "text",
  tag: "h1"
};
