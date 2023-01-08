import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CopyRight } from '.'

export default {
  title: 'common/Footer/CopyRight',
  component: CopyRight,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CopyRight>;

const Template: ComponentStory<typeof CopyRight> = () => <CopyRight />;

export const Primary = Template.bind({});
