import { newtClient } from 'libs/client'
import { parseBody } from 'libs/parse/parseBody'
import { PER_PAGE } from 'pages'
import { Page, TagId, CategoryId, ArticleId, ArticleItem, YearMonthId } from 'types'

type FetchArticlesOptions =
  | { yearmonth: YearMonthId; pageNumber?: Page }
  | { tagId: TagId; pageNumber?: Page }
  | { categoryId: CategoryId; pageNumber?: Page }
  | { ArticleId: ArticleId }
  | { pageNumber?: Page }

export const fetchArticles = async (
  options: FetchArticlesOptions,
): Promise<{ blogs: ArticleItem[]; totalCount: number }> => {
  const pageNumber = (() => {
    if ('pageNumber' in options) {
      return options.pageNumber
    } else {
      return 1
    }
  })() as number

  if ('yearmonth' in options) {
    const [year, month] = options.yearmonth.split('-').map(v => Number(v))
    const blogs = await newtClient.getContents<ArticleItem>({
      appUid: 'asunaroblog',
      modelUid: 'article',
      query: {
        '_sys.raw.firstPublishedAt': { lt: `${year}-${month + 1}`, gte: `${year}-${month}` },
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
    const blogs = await newtClient.getContents<ArticleItem>({
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
    const blogs = await newtClient.getContents<ArticleItem>({
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
  } else if ('ArticleId' in options) {
    const ArticleId = options.ArticleId
    const blog = await newtClient.getContent<ArticleItem>({
      appUid: 'asunaroblog',
      modelUid: 'article',
      contentId: ArticleId,
    })

    const body = (await parseBody(blog.body)).replace('\n', '')
    return {
      blogs: [{ ...blog, body }],
      totalCount: 1,
    }
  } else {
    const blogs = await newtClient.getContents<ArticleItem>({
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
