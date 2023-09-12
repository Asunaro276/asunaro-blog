import { newtClient } from 'libs/client'
import { parseBody } from 'libs/parse/parseBody'
import { PER_PAGE } from 'pages'
import { Year, Page, TagId, CategoryId, BlogId, ArticleResponse, NewtItems, Article } from 'types'

type FetchArticlesOptions =
  | { year: Year; pageNumber?: Page }
  | { tagId: TagId; pageNumber?: Page }
  | { categoryId: CategoryId; pageNumber?: Page }
  | { blogId: BlogId }
  | { pageNumber?: Page }

export const fetchArticles = async (
  options: FetchArticlesOptions,
): Promise<{ blogs: ArticleResponse[]; totalCount: number }> => {
  const pageNumber = (() => {
    if ('pageNumber' in options) {
      return options.pageNumber
    } else {
      return 1
    }
  })() as number

  if ('year' in options) {
    const year = options.year
    const blogs = await newtClient.getContents<ArticleResponse>({
      appUid: 'asunaroblog',
      modelUid: 'article',
      query: {
        '_sys.raw.firstPublishedAt': { lt: String(Number(year) + 1), gte: year },
        skip: (pageNumber - 1) * PER_PAGE,
        limit: PER_PAGE,
      },
    })
    return {
      blogs: blogs.items,
      totalCount: blogs.total,
    }
  } else if ('tagId' in options) {
    const tagId = options.tagId
    const blogs = await newtClient.getContents<ArticleResponse>({
      appUid: 'asunaroblog',
      modelUid: 'article',
      query: {
        tags: { in: [tagId] },
        skip: (pageNumber - 1) * PER_PAGE,
        limit: PER_PAGE,
      },
    })
    return {
      blogs: blogs.items,
      totalCount: blogs.total,
    }
  } else if ('categoryId' in options) {
    const categoryId = options.categoryId
    const blogs = await newtClient.getContents<ArticleResponse>({
      appUid: 'asunaroblog',
      modelUid: 'article',
      query: {
        category: categoryId,
        skip: (pageNumber - 1) * PER_PAGE,
        limit: PER_PAGE,
      },
    })
    return {
      blogs: blogs.items,
      totalCount: blogs.total,
    }
  } else if ('blogId' in options) {
    const blogId = options.blogId
    const blog = await newtClient.getContent<NewtItems<Article>>({
      appUid: 'asunaroblog',
      modelUid: 'article',
      contentId: blogId,
    })
    const body = (await parseBody(blog.body)).replace('\n', '')
    return {
      blogs: [{ ...blog, body }],
      totalCount: 1,
    }
  } else {
    const blogs = await newtClient.getContents<ArticleResponse>({
      appUid: 'asunaroblog',
      modelUid: 'article',
      query: {
        skip: (pageNumber - 1) * PER_PAGE,
        limit: PER_PAGE,
      },
    })
    return {
      blogs: blogs.items,
      totalCount: blogs.total,
    }
  }
}
