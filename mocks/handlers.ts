import { rest } from 'msw'
import indexData from './test-data/index.json'
import categoryData from './test-data/category.json'
import tagData from './test-data/tag.json'
import yearmonthData from './test-data/yearmonth.json'
import blogData from './test-data/blog/index'
import { ArticleItem, ArticleResponse, CategoryResponse, TagResponse, YearMonthResponse } from 'types'

const baseUrl = `https://${process.env.NEWT_SPACE_UID}.cdn.newt.so/v1`

export const handlers = [
  rest.get(`${baseUrl}/asunaroblog/article`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<ArticleResponse>(indexData))
  }),
  rest.get(`${baseUrl}/asunaroblog/article/:ArticleId`, (req, res, ctx) => {
    const articleId = req.params.ArticleId as string
    const num = parseInt(articleId)
    const resData = blogData[num % 2]
    return res(ctx.status(200), ctx.json<ArticleItem>(resData))
  }),
  rest.get(`${baseUrl}/asunaroblog/tag`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<TagResponse>(tagData))
  }),
  rest.get(`${baseUrl}/asunaroblog/yearmonth`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<YearMonthResponse>(yearmonthData))
  }),
  rest.get(`${baseUrl}/asunaroblog/category`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<CategoryResponse>(categoryData))
  }),
  rest.get(`https://amzn.to/*`, (req, res, ctx) => {
    return res()
  }),
  rest.get(`https://qiita.com/*`, (req, res, ctx) => {
    return res()
  }),
]
