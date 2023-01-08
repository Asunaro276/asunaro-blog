import { ComponentStory, ComponentMeta } from '@storybook/react'

import SideBar from '.'

export default {
  title: 'common/SideBar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => <SideBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  headings: [
    {
      text: "aaaaa",
      id: "1",
      htmlTag: "h1",
    },
    {
      text: "aa",
      id: "11",
      htmlTag: "h2",
    },
    {
      text: "bbbbb",
      id: "2",
      htmlTag: "h1",
    },
  ],
  tags: [
    {
        "id": "9d9mq5wex",
        "tag": "KaTeX"
    },
    {
        "id": "qjlm24elza",
        "tag": "ブログ"
    },
    {
        "id": "brpyslupgwc",
        "tag": "ロジカルシンキング"
    },
    {
        "id": "px6ogvwe2cf",
        "tag": "ネット広告"
    }
  ],
}
