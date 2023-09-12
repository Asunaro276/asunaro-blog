import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { newtClient } from '../../libs/client'
import { ArticleResponse, CategoryResponse, Heading, TagResponse } from 'types'
import { NextSeo } from 'next-seo'
import PostPage from 'components/PostPage'
import { parseHeading } from 'libs/parse/parseHeading'
import 'highlight.js/styles/monokai.css'
import { fetchBlogData } from 'libs/fetch/fetchBlogData'

type Props = {
  blog: ArticleResponse
  headings: Heading[]
  categories: CategoryResponse[]
  tags: TagResponse[]
  years: { [key: number]: number }
}

interface Params extends ParsedUrlQuery {
  blogId: string
}

export default function BlogId(props: Props) {
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
        years={props.years}
      />
    </main>
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const blogs = await newtClient.getContents<ArticleResponse>({
    appUid: 'asunaroblog',
    modelUid: 'article',
    query: { limit: 100 },
  })
  const paths = blogs.items.map((blog) => `/blog/${blog._id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params!.blogId

  const { blogs, categories, tags, years } = await fetchBlogData({ blogId: id })

  const headings = parseHeading(blogs[0].body)

  return {
    props: {
      blog: blogs[0],
      headings: headings,
      categories: categories,
      tags: tags,
      years: years,
    },
  }
}
