import { newtClient } from 'libs/client';
import {
  ArticleResponse,
  BlogId,
  CategoryId,
  Page,
  TagId,
  Year,
  Years,
} from 'types';
import { fetchArticles } from './fetchArticles';
import { fetchCategories } from './fetchCategories';
import { fetchTags } from './fetchTags';
import { countTagArticles } from './countTagArticles';
import { countYearArticles } from './countYearArticles';

type FetchBlogDataOptions =
  | { year: Year; pageNumber?: Page }
  | { tagId: TagId; pageNumber?: Page }
  | { categoryId: CategoryId; pageNumber?: Page }
  | { blogId: BlogId }
  | { pageNumber?: Page };

export const fetchBlogData = async (options: FetchBlogDataOptions) => {
  const { blogs, totalCount } = await fetchArticles(options)
  const categories = await fetchCategories()
  const tags = await fetchTags()

  const propTags = await countTagArticles(tags)

  // 年ごとのポスト数を入手
  const years = await countYearArticles([2023])
  return {
    blogs,
    categories,
    tags: propTags,
    years,
    totalCount,
  };
};
