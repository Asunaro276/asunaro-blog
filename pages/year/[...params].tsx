import HomePage from 'components/HomePage'
import { newtClient } from 'libs/client'
import { fetchBlogData } from 'libs/fetch/fetchBlogData'
import { GetStaticProps, GetStaticPaths } from 'next'
import { PER_PAGE } from 'pages'
import { ParsedUrlQuery } from 'querystring'
import { ArticleResponse, CategoryResponse, TagResponse } from 'types'

type Props = {
  blogs: ArticleResponse[]
  categories: CategoryResponse[]
  tags: TagResponse[]
  years: { [key: number]: number }
  year: number
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
        years={props.years}
        year={props.year}
      />
    </div>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  const years = range(2022, 2023)
  let paths = []
  for (const year of years) {
    const countPerYear = (
      await newtClient.getContents<ArticleResponse>({
        appUid: 'asunaroblog',
        modelUid: 'article',
        query: {
          '_sys.raw.firstPublishedAt': { lt: String(year + 1), gte: String(year) },
          select: ['total'],
        },
      })
    ).total
    paths.push(`/year/${year}`)
    paths.push(
      ...range(1, Math.ceil(countPerYear / PER_PAGE)).map(
        (pageNumber) => `/year/${year}/${pageNumber}`,
      ),
    )
  }
  return { paths, fallback: false }
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const year = Number(context.params!.params[0])
  const pageNumber = context.params?.params.length === 1 ? 1 : Number(context.params!.params[1])

  const { blogs, categories, tags, years, totalCount } = await fetchBlogData({
    year: year,
    pageNumber: pageNumber,
  })

  return {
    props: {
      blogs,
      categories,
      tags,
      years,
      totalCount,
      year,
      pageNumber,
    },
  }
}
