import { newtClient } from 'libs/client'
import { fetchBlogData } from 'libs/fetch/fetchBlogData'
import { GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import { PER_PAGE } from 'pages'
import { ParsedUrlQuery } from 'querystring'
import { ArticleItem, CategoryItem, TagItem, YearMonthItem } from 'types'
import { range } from '/libs/utils'
import { HomePage } from '/components/HomePage'

type Props = {
  blogs: ArticleItem[]
  categories: CategoryItem[]
  category: CategoryItem
  tags: TagItem[]
  yearmonths: YearMonthItem[]
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
        yearmonths={props.yearmonths}
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
  const paths = categories.flatMap(categoryItem => {
    const pageCount = Math.ceil(categoryItem.ref.length / PER_PAGE)
    return range(pageCount).map(pageNum => ({
        params: {
          params: pageNum == 1 ? [categoryItem._id] : [categoryItem._id, String(pageNum)]
        }
      }
    ))
  })
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const categoryId = context.params!.params[0]
  const pageNumber = context.params?.params.length === 1 ? 1 : Number(context.params!.params[1])

  const { blogs, categories, tags, yearmonths, totalCount } = await fetchBlogData({ pageNumber, categoryId })
  const category = categories.filter((cat) => cat._id === categoryId)[0]

  return {
    props: {
      blogs,
      categories,
      tags,
      yearmonths,
      totalCount,
      pageNumber,
      category,
    },
  }
}
