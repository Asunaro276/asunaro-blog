import { rest } from 'msw'
import indexData from './test-data/index.json'
import categoryData from './test-data/category.json'
import tagData from './test-data/tag.json'
import blogData from './test-data/blog/index'
import { Article, Category, NewtItems, NewtResponse, Tag } from 'types'

const baseUrl = `https://${process.env.NEWT_SPACE_UID}.cdn.newt.so/v1`

export const handlers = [
  rest.get(`${baseUrl}/asunaroblog/article`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<NewtResponse<Article>>(indexData))
  }),
  rest.get(`${baseUrl}/asunaroblog/article/:blogId`, (req, res, ctx) => {
    const { blogId } = req.params
    const resData = blogData[Number(blogId) % 2]
    return res(ctx.status(200), ctx.json<NewtItems<Article>>(resData))
  }),
  rest.get(`${baseUrl}/asunaroblog/tag`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<NewtResponse<Tag>>(tagData))
  }),
  rest.get(`${baseUrl}/asunaroblog/category`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<NewtResponse<Category>>(categoryData))
  }),
]
