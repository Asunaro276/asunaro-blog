import { newtClient } from 'libs/client';
import { parseBody } from 'libs/parse/parseBody';
import { PER_PAGE } from 'pages';
import {
  ArticleResponse,
  BlogId,
  CategoryId,
  CategoryResponse,
  Page,
  TagId,
  TagResponse,
  Year,
  Years,
} from 'types';

type FetchArticlesOptions =
  | { year: Year; pageNumber?: Page }
  | { tagId: TagId; pageNumber?: Page }
  | { categoryId: CategoryId; pageNumber?: Page }
  | { blogId: BlogId }
  | { pageNumber?: Page };

export const fetchArticles = async (options: FetchArticlesOptions) => {
  const pageNumber = (() => {
    if ('pageNumber' in options) {
      return options.pageNumber;
    } else {
      return 1;
    }
  })() as number;
  console.log(pageNumber)

  const {blogs, totalCount} = await (async (): Promise<{ blogs: ArticleResponse[], totalCount: number }> => {
    if ('year' in options) {
      const year = options.year;
      const blogs = await newtClient.getContents<ArticleResponse>({
        appUid: 'asunaroblog',
        modelUid: 'article',
        query: {
          '_sys.raw.firstPublishedAt': { lt: String(Number(year) + 1), gte: year },
          skip: (pageNumber - 1) * PER_PAGE,
          limit: PER_PAGE,
        },
      });
      return {
        blogs: blogs.items,
        totalCount: blogs.total
      };
    } else if ('tagId' in options) {
      const tagId = options.tagId;
      const blogs = await newtClient.getContents<ArticleResponse>({
        appUid: 'asunaroblog',
        modelUid: 'article',
        query: {
          tags: { in: [tagId] },
          skip: (pageNumber - 1) * PER_PAGE,
          limit: PER_PAGE
        },
      });
      return {
        blogs: blogs.items,
        totalCount: blogs.total
      };
    } else if ('categoryId' in options) {
      const categoryId = options.categoryId;
      const blogs = await newtClient.getContents<ArticleResponse>({
        appUid: 'asunaroblog',
        modelUid: 'article',
        query: {
          category: categoryId,
          skip: (pageNumber - 1) * PER_PAGE,
          limit: PER_PAGE
        },
      });
      return {
        blogs: blogs.items,
        totalCount: blogs.total
      };
    } else if ('blogId' in options) {
      const blogId = options.blogId;
      const blog = await newtClient.getContent<ArticleResponse>({
        appUid: 'asunaroblog',
        modelUid: 'article',
        contentId: blogId,
      });
      const body = (await parseBody(blog.body)).replace('\n', '');
      return {
        blogs: [{ ...blog, body }],
        totalCount: 1
      };
    } else {
      const blogs = await newtClient.getContents<ArticleResponse>({
        appUid: 'asunaroblog',
        modelUid: 'article',
        query: {
          skip: (pageNumber - 1) * PER_PAGE,
          limit: PER_PAGE
        },
      });
      return {
        blogs: blogs.items,
        totalCount: blogs.total
      };
    }
  })();

  const categories = (
    await newtClient.getContents<CategoryResponse>({
      appUid: 'asunaroblog',
      modelUid: 'category',
      query: { order: ['-_sys.customOrder'] },
    })
  ).items;

  const tags = (
    await newtClient.getContents<TagResponse>({
      appUid: 'asunaroblog',
      modelUid: 'tag',
      query: { limit: 100 },
    })
  ).items;

  // タグごとのポスト数を入手
  let propTags: TagResponse[] = [];
  for (const tag of tags) {
    const countTag = (
      await newtClient.getContents<ArticleResponse>({
        appUid: 'asunaroblog',
        modelUid: 'article',
        query: { tags: { in: [tag._id] }, field: 'total' },
      })
    ).total;
    propTags.push({
      ...tag,
      totalCount: countTag,
    });
  }
  propTags.sort((a, b) => (Number(a.totalCount) < Number(b.totalCount) ? 1 : -1));

  // 年ごとのポスト数を入手
  const initialYears: Years = { 2023: 0 };
  const years = (await Object.keys(initialYears).reduce(
    async (after, y) => ({
      ...after,
      [y]: (
        await newtClient.getContents<ArticleResponse>({
          appUid: 'asunaroblog',
          modelUid: 'article',
          query: {
            '_sys.raw.firstPublishedAt': { lt: String(Number(y) + 1), gte: y },
            select: ['total'],
          },
        })
      ).total,
    }),
    {},
  )) as Years;

  return {
    blogs,
    categories,
    tags: propTags,
    years,
    totalCount,
  };
};
