import * as cheerio from 'cheerio'
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { client } from "../../libs/client"
import { Blog, Category, Paragraph } from "../../types"
import { NextSeo } from 'next-seo'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github-dark.css'
import PostPage from 'components/PostPage'

hljs.registerLanguage("xml", xml)
hljs.registerLanguage("javascript", javascript)

type Props = {
  blog: Blog
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
  const data = await client.get({ endpoint: "blog", contentId: id }) as Blog;
  const categories = await client.get({ endpoint: "categories" })
  // const $ = cheerio.load(data.body.flatMap(value => {
  //   if (value.fieldId === "paragraph") {
  //     return (value as Paragraph).paragraph
  //   }
  // }));

  // $('pre code').each((_, element) => {
  // const result = hljs.highlightAuto($(element).text())
  // $(element).html(result.value)
  // $(element).addClass('hljs my-5')
  // })
  return {
    props: {
      blog: data,
      categories: categories.contents
    },
  };
};
