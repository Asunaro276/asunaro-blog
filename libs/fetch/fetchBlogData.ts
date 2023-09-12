import { BlogId, CategoryId, Page, TagId, Year } from 'types'
import { fetchArticles } from './fetchArticles'
import { fetchCategories } from './fetchCategories'
import { fetchTags } from './fetchTags'
import { countTagArticles } from './countTagArticles'
import { countYearArticles } from './countYearArticles'

type FetchBlogDataOptions =
  | { year: Year; pageNumber?: Page }
  | { tagId: TagId; pageNumber?: Page }
  | { categoryId: CategoryId; pageNumber?: Page }
  | { blogId: BlogId }
  | { pageNumber?: Page }

export const fetchBlogData = async (options: FetchBlogDataOptions) => {
  const results = await Promise.all([fetchArticles(options), fetchCategories(), fetchTags()])
  const [{ blogs, totalCount }, categories, tags] = results

  const countResults = await Promise.all([countTagArticles(tags), countYearArticles([2023])])
  const [propTags, years] = countResults

  return {
    blogs,
    categories,
    tags: propTags,
    years,
    totalCount,
  }
}
