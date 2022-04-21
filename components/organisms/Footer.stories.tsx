import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Footer } from './Footer'

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
  pages: ["page1", "page2"],
  linkTo: ["", ""]
};
