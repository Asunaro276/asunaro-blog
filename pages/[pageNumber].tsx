import HomePage from 'components/HomePage'
import { newtClient } from 'libs/client'
import { fetchBlogData } from 'libs/fetch/fetchBlogData'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { PER_PAGE } from 'pages'
import { ArticleItem, CategoryItem, TagItem, Years } from 'types'

type Props = {
  pageNumber: number
  blogs: ArticleItem[]
  categories: CategoryItem[]
  tags: TagItem[]
  years: Years
  totalCount: number
}

type Params = {
  pageNumber: string
}

// pages/blog/[id].js
export default function BlogPageId(props: Props) {
  return (
    <main>
      <NextSeo title='asunaroblog' titleTemplate='%s' />
      <HomePage
        pageNumber={props.pageNumber}
        blogs={props.blogs}
        categories={props.categories}
        tags={props.tags}
        years={props.years}
        totalCount={props.totalCount}
      />
    </main>
  )
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const blogs = await newtClient.getContents({ appUid: 'asunaroblog', modelUid: 'article' })
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(1, Math.ceil(blogs.total / PER_PAGE)).map((pageNumber) => `/${pageNumber}`)
  console.log(blogs)
  return { paths, fallback: false }
}

// データを取得
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const pageNumber = Number(context.params!.pageNumber)
  const { blogs, categories, tags, years, totalCount } = await fetchBlogData({
    pageNumber: pageNumber,
  })

  return {
    props: {
      blogs,
      categories,
      tags,
      years,
      totalCount,
      pageNumber,
    },
  }
}
