import { ComponentStory, ComponentMeta } from '@storybook/react'

import PostCard from '.'

export default {
  title: 'molecules/PostCard',
  component: PostCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PostCard>;

const Template: ComponentStory<typeof PostCard> = (args) => <PostCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  blog: {
    id: "",
    title: "title",
    description: "description",
    body: "",
    category: {
      id: "",
      name: "category1",
    },
    publishedAt: "",
    image: {
      url: "/logo.png", 
      width: 100,
      height: 100,
    },
    imageAlt: "image"
  }
};
