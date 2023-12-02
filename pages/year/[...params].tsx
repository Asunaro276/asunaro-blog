import { newtClient } from 'libs/client'
import { fetchBlogData } from 'libs/fetch/fetchBlogData'
import { GetStaticProps, GetStaticPaths } from 'next'
import { PER_PAGE } from 'pages'
import { ParsedUrlQuery } from 'querystring'
import { ArticleItem, CategoryItem, TagItem, YearMonthItem } from 'types'
import { range } from '/libs/utils'
import { HomePage } from '/components/HomePage'

type Props = {
  blogs: ArticleItem[]
  categories: CategoryItem[]
  tags: TagItem[]
  yearmonths: YearMonthItem[]
  yearmonth: string
  pageNumber: number
  totalCount: number
}

interface Params extends ParsedUrlQuery {
  params: string[]
}

export default function YearId(props: Props) {
  return (
    <div>
      <HomePage
        pageNumber={props.pageNumber}
        totalCount={props.totalCount}
        blogs={props.blogs}
        categories={props.categories}
        tags={props.tags}
        yearmonths={props.yearmonths}
        yearmonth={props.yearmonth}
      />
    </div>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const yearmonth = (
    await newtClient.getContents<YearMonthItem>({
      appUid: 'asunaroblog',
      modelUid: 'yearmonth',
      query: { limit: 100 },
    })
  ).items
  const paths = yearmonth.flatMap(yearmonthItem => {
    const pageCount = Math.ceil(yearmonthItem.ref.length / PER_PAGE)
    return range(pageCount).map(pageNum => ({
        params: {
          params: pageNum == 1 ? [yearmonthItem.yearmonth] : [yearmonthItem.yearmonth, String(pageNum)]
        }
      }
    ))
  })
  return { paths, fallback: false }
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const yearmonth = context.params!.params[0]
  const pageNumber = context.params?.params.length === 1 ? 1 : Number(context.params!.params[1])

  const { blogs, categories, tags, yearmonths, totalCount } = await fetchBlogData({ yearmonth, pageNumber })

  return {
    props: {
      blogs,
      categories,
      tags,
      yearmonths,
      yearmonth,
      totalCount,
      pageNumber,
    },
  }
}
