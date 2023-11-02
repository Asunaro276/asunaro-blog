import HomePage from 'components/HomePage'
import { newtClient } from 'libs/client'
import { fetchBlogData } from 'libs/fetch/fetchBlogData'
import { GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import { PER_PAGE } from 'pages'
import { ParsedUrlQuery } from 'querystring'
import { ArticleItem, CategoryItem, Page, TagId, TagItem, YearMonthItem } from 'types'
import { range } from '/libs/utils'

type Props = {
  blogs: ArticleItem[]
  categories: CategoryItem[]
  tags: TagItem[]
  yearmonths: YearMonthItem[]
  tag: TagItem
  pageNumber: number
  totalCount: number
}

interface Params extends ParsedUrlQuery {
  params: string[]
}

export default function TagItemId(props: Props) {
  return (
    <div>
      <NextSeo title={props.tag.tag} />
      <HomePage
        pageNumber={props.pageNumber}
        totalCount={props.totalCount}
        blogs={props.blogs}
        categories={props.categories}
        tags={props.tags}
        yearmonths={props.yearmonths}
        tag={props.tag}
      />
    </div>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const tags = (
    await newtClient.getContents<TagItem>({
      appUid: 'asunaroblog',
      modelUid: 'tag',
      query: { limit: 100 },
    })
  ).items
  const paths = tags.flatMap(tagItem => {
    const pageCount = Math.ceil(tagItem.ref.length / PER_PAGE)
    return range(pageCount).map(pageNum => ({
        params: {
          params: pageNum == 1 ? [tagItem._id] : [tagItem._id, String(pageNum)]
        }
      }
    ))
  })
  return { paths, fallback: false }
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const tagId = context.params!.params[0]
  const pageNumber = context.params?.params.length === 1 ? 1 : Number(context.params!.params[1])

  const { blogs, categories, tags, yearmonths, totalCount } = await fetchBlogData({ tagId, pageNumber })
  const tag = tags.filter((tag) => tag._id === tagId).pop() as TagItem

  return {
    props: {
      blogs,
      categories,
      tags,
      yearmonths,
      totalCount,
      tag,
      pageNumber,
    },
  }
}
