import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { newtClient } from "../../libs/client"
import { ArticleResponse, CategoryResponse, Heading, TagResponse } from "types"
import { NextSeo } from "next-seo"
import PostPage from "components/PostPage"
import { parseBody } from "libs/parse/parseBody"
import { parseHeading } from "libs/parse/parseHeading"
import 'highlight.js/styles/monokai.css'
import { fetchArticles } from "libs/fetchArticles"

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
  const homeCategory: CategoryResponse = { _id: "/", displayedName: "HOME", name: "home" }
  const categories = [
    homeCategory,
    ...props.categories.map((category) => ({
      ...category,
      _id: `/category/${category._id}`,
    }))
  ]
  return (
    <main>
      <NextSeo
        title={props.blog.title}
        description={props.blog.description}
        openGraph={{
          title: props.blog.title,
          description: props.blog.description,
          images: [{
            url: props.blog.coverImage.src
          }],
        }}
      />
      <PostPage
        blog={props.blog}
        headings={props.headings}
        categories={categories}
        tags={props.tags}
        years={props.years}
      />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const blogs = await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { limit: 100 } })
  const paths = blogs.items.map(blog => `/blog/${blog._id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params!.blogId
  // const data = await newtClient.getContent<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", contentId: id })
  // const categories = await newtClient.getContents<CategoryResponse>({ appUid: "asunaroblog", modelUid: "category", query: { order: ["-_sys.customOrder"] }})
  // const tags = (await newtClient.getContents<TagResponse>({ appUid: "asunaroblog", modelUid: "tag", query: { limit: 100 }})).items

  // // タグごとのポスト数を入手
  // let propTags: TagResponse[] = []
  // for (const tag of tags) {
  //   const countTag = (await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { tags: { in: [tag._id] } , field: "total" }})).total
  //   propTags.push({
  //     ...tag,
  //     totalCount: countTag 
  //   })
  // }
  // propTags.sort((a, b) => Number(a.totalCount) < Number(b.totalCount) ? 1 : -1)
  // // 年ごとのポスト数を入手
  // let years: { [key: number]: number } = { 2022: 0, 2023: 0 }
  // for (const y in years) {
  //   years[y] = (await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { "_sys.raw.firstPublishedAt": { lt: String(Number(y) + 1), gte: y }, select: ["total"] }})).total
  // }

  const { blogs, categories, tags, years } = await fetchArticles({ blogId: id })

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
