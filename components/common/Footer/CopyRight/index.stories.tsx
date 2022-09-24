import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CopyRight } from '.'

export default {
  title: 'molecules/CopyRight',
  component: CopyRight,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CopyRight>;

const Template: ComponentStory<typeof CopyRight> = (args) => <CopyRight {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
