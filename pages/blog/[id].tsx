import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { client } from "../../libs/client"
import { Blog, Category, Code, Image, Link, Paragraph, ParsedBlog } from "../../types"
import cheerio from 'cheerio'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/lib/common'
import 'highlight.js/styles/monokai.css'
import { NextSeo } from "next-seo"
import PostPage from "components/PostPage"
import { parseParagraph } from "libs/parse/parseParagraph"
import { parseCode } from "libs/parse/parseCode"
import { parseLink } from "libs/parse/parseLink"

type Props = {
  blog: ParsedBlog
  categories: Category[]
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function BlogId(props: Props) {
  return (
    <main>
      <NextSeo
        title={props.blog.title}
        description={props.blog.description}
      />
      <PostPage
        blog={props.blog}
        categories={props.categories}
      />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params!.id
  const data = await client.get({ endpoint: "blog", contentId: id }) as Blog
  const categories = await client.get({ endpoint: "categories" })
  const bodyList = data.body.map(value => {
    switch (value.fieldId) {
      case "paragraph":
        return parseParagraph((value as Paragraph).paragraph)

      case "code":
        return parseCode((value as Code).code, (value as Code).fileName)

      case "link":
        return parseLink((value as Link).url, (value as Link).image.url, (value as Link).title)

      default:
        return String.raw`<></>`
      }
    }
  )
  const body = bodyList.join("")
  return {
    props: {
      blog: {...data, body: body},
      categories: categories.contents
    },
  }
}
