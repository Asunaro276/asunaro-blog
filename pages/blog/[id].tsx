import * as cheerio from 'cheerio'
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { client } from "../../libs/client"
import { Blog, Category, MetaData } from "../../types"
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
  content: string
  cardDatas: MetaData[]
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
        content={props.content}
        categories={props.categories}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params!.id
  const data = await client.get({ endpoint: "blog", contentId: id }) as Blog;
  const categories = await client.get({ endpoint: "categories" })
  const $ = cheerio.load(data.body);

  $('pre code').each((_, element) => {
  const result = hljs.highlightAuto($(element).text())
  $(element).html(result.value)
  $(element).addClass('hljs my-5')
  })

  $('h1').each((_, element) => {
  $(element).html()
  // $(element).addClass('ml-8 my-5 text-3xl font-semibold font-body')
  // $(element).wrap('<div class="bg-slate-100 mb-5 mt-20 flex"></div>')
  // $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
  })

  $('h2').each((_, element) => {
  $(element).html()
  // $(element).addClass('ml-4 my-2 text-xl font-semibold font-body')
  // $(element).wrap('<div class="my-8 flex"></div>')
  // $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
  })

  $('p').each((_, element) => {
  $(element).html()
  // $(element).addClass('text-lg font-body leading-loose')
  // $(element).wrap('<div class="my-5"></div>')
  })

  $('img').each((_, element) => {
  $(element).html();
  $(element).addClass("")
  });

  $('ul').each((_, element) => {
  $(element).html();
  // $(element).addClass("list-disc list-inside text-lg space-y-2 ml-6 pl-4 indent-[-1em]")
  });


  $('blockquote').each((_, element) => {
  $(element).html();
  $(element).addClass('ml-4 text-xl opacity-90 font-body')
  $(element).wrap('<div class="flex"></div>')
  $(element).parent().prepend('<div class="w-2 bg-slate-200"></div>')
  });

  const links = $('a').toArray().map((data) => {
    const url = data.attribs.href.indexOf("http") === -1
      ? `${process.env.NEXT_PUBLIC_DOMEIN}${data.attribs.href}`
      : data.attribs.href;
    return {url: url}
  })
  const cardDatas = await Promise.all(
    links.map(async (link) => {
      const metaData: MetaData = {
        url: link.url,
        title: "",
        description: "",
        image: "",
      }
      const metas = await fetch(link.url)
        .then((res) => res.text())
        .then((text) => {
          const $ = cheerio.load(text)
          const metas = $("meta").toArray()
          metas.forEach((meta) => {
            if (meta.attribs?.property === "og:title")
              metaData.title = meta.attribs.content
            if (meta.attribs?.property === "og:description")
              metaData.description = meta.attribs.content
            if (meta.attribs?.property === "og:image")
              metaData.image = meta.attribs.content
          })
          return metaData
        }).catch((error: unknown) => {
          if (error instanceof Error) {
            console.log(error)
          }
          return metaData
        })
        return metas
    })
  )
  return {
    props: {
      blog: data,
      content: $.html(),
      cardDatas: cardDatas,
      categories: categories.contents
    },
  };
};
