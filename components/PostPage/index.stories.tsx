import type { Meta, StoryObj } from '@storybook/react'

import { PostPage } from './'
import { handlers } from '/mocks/handlers'
import testData from '/mocks/test-data/blog/index'
import categoryData from '/mocks/test-data/category.json'
import tagData from '/mocks/test-data/tag.json'
import yearmonthData from '/mocks/test-data/yearmonth.json'
import { modes } from '/.storybook/modes'
import { parseHeading } from '/libs/parse/parseHeading'
import { parseBody } from '/libs/parse/parseBody'

const meta: Meta<typeof PostPage> = {
  component: PostPage,
  title: 'page/PostPage',
  render: (args, { loaded: { body } }) => {
    console.log(body)
    return <PostPage {...args} blog={{...args.blog, body: body}} />    
  },
  parameters: {
    msw: {
      handlers: [...handlers],
    },
    chromatic: {
      modes: {
        mobile: modes['small'],
        desktop: modes['large']     
      },
      disableSnapshot: true
    }
  },
}

export default meta
type Story = StoryObj<typeof PostPage>

export const PostPage0: Story = {
  name: 'SPA、SSR、SSGってなんだ？｜フロントエンド',
  loaders: [
    async () => ({
      body: await parseBody(testData[0].body),
    }),
  ],
  args: {
    blog: testData[0],
    headings: parseHeading(testData[0].body),
    categories: categoryData.items,
    tags: tagData.items,
    yearmonths: yearmonthData.items,
  },
}

export const PostPage1: Story = {
  name: '「条件付き独立の仮定」をしっかり理解する｜計量経済学の基礎',
  loaders: [
    async () => ({
      body: await parseBody(testData[1].body),
    }),
  ],
  args: {
    blog: testData[1],
    headings: parseHeading(testData[1].body),
    categories: categoryData.items,
    tags: tagData.items,
    yearmonths: yearmonthData.items,
  },
}
