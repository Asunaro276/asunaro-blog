import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { client } from "../../libs/client"
import { Blog, Category, Code, Heading, Link, Math, Paragraph, ParsedBlog, Tag } from "types"
import { NextSeo } from "next-seo"
import PostPage from "components/PostPage"
import { parseParagraph } from "libs/parse/parseParagraph"
import { parseCode } from "libs/parse/parseCode"
import { parseLink } from "libs/parse/parseLink"
import { parseHeading } from "libs/parse/parseHeading"
import { parseMath } from "libs/parse/parseMath"

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
  const blogs = await client.get({ endpoint: "blog" });
  const paths = blogs.contents.map((blog: Blog) => `/blog/${blog.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params!.blogId
  const data = await client.get({ endpoint: "blog", contentId: id }) as Blog
  const categories = await client.get({ endpoint: "categories" })
  const tags = (await client.get({ endpoint: "tags" })).contents as Tag[]
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

  const bodyList = data.body.map(value => {
    switch (value.fieldId) {
      case "paragraph":
        return parseParagraph((value as Paragraph).paragraph)

      case "code":
        return parseCode((value as Code).code, (value as Code).fileName)

      case "link":
        return parseLink((value as Link).url, (value as Link).image.url, (value as Link).title)

      case "math":
        return parseMath((value as Math).formula)


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