import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { client } from "../../libs/client"
import { Blog, Category, Code, Heading, Link, Paragraph, ParsedBlog, Tag } from "types"
import { NextSeo } from "next-seo"
import PostPage from "components/PostPage"
import { parseParagraph } from "libs/parse/parseParagraph"
import { parseCode } from "libs/parse/parseCode"
import { parseLink } from "libs/parse/parseLink"
import { parseHeading } from "libs/parse/parseHeading"
import 'highlight.js/styles/monokai.css'
import katex from "katex"

type Props = {
  blog: ParsedBlog
  headings: Heading[]
  categories: Category[]
  tags: Tag[]
}

interface Params extends ParsedUrlQuery {
  blogId: string
}

export default function BlogId(props: Props) {
  const homeCategory: Category = { id: "/", displayedName: "Home", name: "home" }
  const categories = [
    homeCategory,
    ...props.categories.map((category) => ({
      ...category,
      id: `/category/${category.id}`,
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
      />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const blogs = await client.get({ endpoint: "blog", queries: { limit: 100 } });
  const paths = blogs.contents.map((blog: Blog) => `/blog/${blog.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params!.blogId
  const data = await client.get({ endpoint: "blog", contentId: id }) as Blog
  const categories = await client.get({ endpoint: "categories" })
  const tags = (await client.get({ endpoint: "tags", queries: { limit: 100 }})).contents as Tag[]
  let propTags = []
  for (const tag of tags) {
    const tagBlogs = await client.get({ endpoint: "blog", queries: { filters: `tags[contains]${tag.id}` } })
    const tagTotalCount = tagBlogs.totalCount
    propTags.push({
      ...tag,
      tagTotalCount: tagTotalCount
    })
  }
  propTags.sort((a, b) => Number(a.tagTotalCount) < Number(b.tagTotalCount) ? 1 : -1)
  propTags = propTags.slice(0, 10)

  const bodyList = data.body.map(value => {
    switch (value.fieldId) {
      case "paragraph":
        const paragraph = parseParagraph((value as Paragraph).paragraph)
        .replaceAll(/(?!")\$\$(?!")[^\$]*(?!")\$\$(?!")/g, (substring) =>
        katex.renderToString(substring.replaceAll("$", "").replaceAll(/(<br>|<\\br>|&nbsp;|amp;)/g, ""),
        { output: "mathml", displayMode: true, strict: "ignore" }))
        .replaceAll(/(?!")\$(?!")[^\$]*(?!")\$(?!")/g, (substring) => {
          console.log(substring)
          return katex.renderToString(substring.replaceAll("$", ""),
          { output: "mathml", strict: "ignore" })
        })
        return paragraph

      case "code":
        return parseCode((value as Code).code, (value as Code).fileName)

      case "link":
        return parseLink((value as Link).url, (value as Link).image.url, (value as Link).title)

      default:
        return String.raw``
      }
    }
  )
  const body = bodyList.join("")
  const heading = parseHeading(body)
  return {
    props: {
      blog: {...data, body: body},
      headings: heading,
      categories: categories.contents as Category[],
      tags: propTags as Tag[]
    },
  }
}
