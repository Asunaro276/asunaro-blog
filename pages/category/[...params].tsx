import HomePage from 'components/HomePage'
import { newtClient } from 'libs/client'
import { fetchBlogData } from 'libs/fetch/fetchBlogData'
import { GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import { PER_PAGE } from 'pages'
import { ParsedUrlQuery } from 'querystring'
import { ArticleItem, CategoryItem, TagItem } from 'types'

type Props = {
  blogs: ArticleItem[]
  categories: CategoryItem[]
  category: CategoryItem
  tags: TagItem[]
  years: { [key: number]: number }
  totalCount: number
  pageNumber: number
}

interface Params extends ParsedUrlQuery {
  params: string[]
}

export default function CategoryItemId(props: Props) {
  return (
    <div>
      <NextSeo title={props.category.displayedName} />
      <HomePage
        totalCount={props.totalCount}
        pageNumber={props.pageNumber}
        blogs={props.blogs}
        categories={props.categories}
        tags={props.tags}
        years={props.years}
        category={props.category}
      />
    </div>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const categories = (
    await newtClient.getContents<CategoryItem>({
      appUid: 'asunaroblog',
      modelUid: 'category',
      query: { limit: 100 },
    })
  ).items
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  let paths = []
  for (const category of categories) {
    const countPerCategory = (
      await newtClient.getContents<ArticleItem>({
        appUid: 'asunaroblog',
        modelUid: 'article',
        query: { category: category._id, select: ['total'] },
      })
    ).total
    paths.push(`/category/${category._id}`)
    paths.push(
      ...range(1, Math.ceil(countPerCategory / PER_PAGE)).map(
        (pageNumber) => `/category/${category._id}/${pageNumber}`,
      ),
    )
  }
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const categoryId = context.params!.params[0]
  const pageNumber = context.params?.params.length === 1 ? 1 : Number(context.params!.params[1])

  const { blogs, categories, tags, years, totalCount } = await fetchBlogData({
    pageNumber: pageNumber,
    categoryId: categoryId,
  })
  const category = categories.filter((cat) => cat._id === categoryId)[0]

  return {
    props: {
      blogs,
      categories,
      tags,
      years,
      totalCount,
      pageNumber,
      category,
    },
  }
}
