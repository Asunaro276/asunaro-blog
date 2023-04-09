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
      _id: "1",
      htmlTag: "h1",
    },
    {
      text: "aa",
      _id: "11",
      htmlTag: "h2",
    },
    {
      text: "bbbbb",
      _id: "2",
      htmlTag: "h1",
    },
  ],
  tags: [
    {
      "_id": "641d60820293b870f66d29e0",
      "_sys": {
        "raw": {
          "createdAt": "2023-03-24T08:34:10.896Z",
          "updatedAt": "2023-03-29T06:19:20.386Z",
          "firstPublishedAt": "2023-03-24T08:34:10.896Z",
          "publishedAt": "2023-03-29T06:19:20.386Z"
        },
        "customOrder": 14,
        "createdAt": "2023-03-24T08:34:10.896Z",
        "updatedAt": "2023-03-29T06:19:20.386Z"
      },
      "tag": "KaTeX"
    },
    {
      "_id": "641d60780293b870f66d1e8f",
      "_sys": {
        "raw": {
          "createdAt": "2023-03-24T08:34:00.436Z",
          "updatedAt": "2023-03-29T06:19:11.123Z",
          "firstPublishedAt": "2023-03-24T08:34:00.436Z",
          "publishedAt": "2023-03-29T06:19:11.123Z"
        },
        "customOrder": 13,
        "createdAt": "2023-03-24T08:34:00.436Z",
        "updatedAt": "2023-03-29T06:19:11.123Z"
      },
      "tag": "ブログ"
    },
    {
      "_id": "641d606a0293b870f66cf22e",
      "_sys": {
        "raw": {
          "createdAt": "2023-03-24T08:33:46.817Z",
          "updatedAt": "2023-03-29T06:19:05.465Z",
          "firstPublishedAt": "2023-03-24T08:33:46.818Z",
          "publishedAt": "2023-03-29T06:19:05.465Z"
        },
        "customOrder": 12,
        "createdAt": "2023-03-24T08:33:46.818Z",
        "updatedAt": "2023-03-29T06:19:05.465Z"
      },
      "tag": "ロジカルシンキング"
    },
    {
      "_id": "641d60610293b870f66cea7b",
      "_sys": {
        "raw": {
          "createdAt": "2023-03-24T08:33:37.951Z",
          "updatedAt": "2023-03-29T06:18:58.041Z",
          "firstPublishedAt": "2023-03-24T08:33:37.951Z",
          "publishedAt": "2023-03-29T06:18:58.041Z"
        },
        "customOrder": 11,
        "createdAt": "2023-03-24T08:33:37.951Z",
        "updatedAt": "2023-03-29T06:18:58.041Z"
      },
      "tag": "ネット広告"
    }
  ],
}
