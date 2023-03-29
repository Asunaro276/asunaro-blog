import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { newtClient } from "../../libs/client"
import { Article, Category, Heading, Tag } from "types"
import { NextSeo } from "next-seo"
import PostPage from "components/PostPage"
import { parseBody } from "libs/parse/parseBody"
import { parseHeading } from "libs/parse/parseHeading"
import 'highlight.js/styles/monokai.css'
import katex from "katex"

type Props = {
  blog: Article
  headings: Heading[]
  categories: Category[]
  tags: Tag[]
  years: { [key: number]: number }
}

interface Params extends ParsedUrlQuery {
  blogId: string
}

export default function BlogId(props: Props) {
  const homeCategory: Category = { _id: "/", displayedName: "Home", name: "home" }
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
  const blogs = await newtClient.getContents<Article>({ appUid: "asunaroblog", modelUid: "article", query: { limit: 100 } })
  const paths = blogs.items.map(blog => `/blog/${blog._id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params!.blogId
  const data = await newtClient.getContent<Article>({ appUid: "asunaroblog", modelUid: "article", contentId: id })
  const categories = await newtClient.getContents<Category>({ appUid: "asunaroblog", modelUid: "category", query: { order: ["-_sys.customOrder"] }})
  const tags = (await newtClient.getContents<Tag>({ appUid: "asunaroblog", modelUid: "tag", query: { limit: 100 }})).items

  // タグごとのポスト数を入手
  let propTags: Tag[] = []
  for (const tag of tags) {
    const countTag = (await newtClient.getContents<Article>({ appUid: "asunaroblog", modelUid: "article", query: { tags: { in: [tag._id] } , field: "total" }})).total
    propTags.push({
      ...tag,
      tagTotalCount: countTag 
    })
  }
  propTags.sort((a, b) => Number(a.tagTotalCount) < Number(b.tagTotalCount) ? 1 : -1)
  // 年ごとのポスト数を入手
  let years: { [key: number]: number } = { 2022: 0, 2023: 0 }
  for (const y in years) {
    years[y] = (await newtClient.getContents<Article>({ appUid: "asunaroblog", modelUid: "article", query: { "_sys.raw.firstPublishedAt": { lt: String(Number(y) + 1), gte: y }, select: ["total"] }})).total
  }

  const body = parseBody(data.body)
  .replaceAll(/(?!")\$\$(?!")[^\$]*(?!")\$\$(?!")/g, (substring) =>
  katex.renderToString(substring.replaceAll("$", "").replaceAll(/(<br>|<\\br>|&nbsp;|amp;)/g, ""),
  { output: "mathml", displayMode: true, strict: "ignore" }))
  .replaceAll(/(?!")\$(?!")[^\$]*(?!")\$(?!")/g, (substring) => {
    return katex.renderToString(substring.replaceAll("$", ""),
    { output: "mathml", strict: "ignore" })
  })

  const headings = parseHeading(body)
  return {
    props: {
      blog: {...data, body: body },
      headings: headings,
      categories: categories.items,
      tags: propTags,
      years: years,
    },
  }
}
