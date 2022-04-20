import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LinkButtonGroup from './LinkButtonGroup';

export default {
  title: 'molecules/LinkButtonGroup',
  component: LinkButtonGroup,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LinkButtonGroup>;

const Template: ComponentStory<typeof LinkButtonGroup> = (args) => <LinkButtonGroup {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  contents: [...Array(5)].map((v, k) => `Option${k}`),
  linkTo: [...Array(5)].map(() => "")
};
