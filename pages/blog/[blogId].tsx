import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { newtClient } from '../../libs/client'
import { ArticleItem, CategoryItem, Heading, TagItem, YearMonthItem } from 'types'
import { NextSeo } from 'next-seo'
import { parseHeading } from 'libs/parse/parseHeading'
import 'highlight.js/styles/monokai.css'
import { fetchBlogData } from 'libs/fetch/fetchBlogData'
import { PostPage } from '/components/PostPage'

type Props = {
  blog: ArticleItem
  headings: Heading[]
  categories: CategoryItem[]
  tags: TagItem[]
  yearmonths: YearMonthItem[]
}

interface Params extends ParsedUrlQuery {
  blogId: string
}

export default function ArticleId(props: Props) {
  return (
    <main>
      <NextSeo
        title={props.blog.title}
        description={props.blog.description}
        openGraph={{
          title: props.blog.title,
          description: props.blog.description,
          images: [
            {
              url: props.blog.coverImage.src,
            },
          ],
        }}
      />
      <PostPage
        blog={props.blog}
        headings={props.headings}
        categories={props.categories}
        tags={props.tags}
        yearmonths={props.yearmonths}
      />
    </main>
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const blogs = await newtClient.getContents<ArticleItem>({
    appUid: 'asunaroblog',
    modelUid: 'article',
    query: {
      limit: 100,
      select: ['_id']
    },
  })
  const paths = blogs.items.map((blog) => `/blog/${blog._id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params!.blogId

  const { blogs, categories, tags, yearmonths } = await fetchBlogData({ ArticleId: id })

  const headings = parseHeading(blogs[0].body)

  return {
    props: {
      blog: blogs[0],
      headings: headings,
      categories: categories,
      tags: tags,
      yearmonths: yearmonths,
    },
  }
}
