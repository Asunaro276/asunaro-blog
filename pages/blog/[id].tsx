import * as cheerio from 'cheerio'
import PostPage from "components/templates/PostPage"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { Button } from '@mui/material'
import { client } from "../../libs/client"
import { Blog, Category } from "../../types"
import hljs from 'highlight.js/lib/core'
import { NextSeo } from 'next-seo'

type Props = {
  blog: Blog
  content: string
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
  $(element).addClass('ml-8 my-5 text-3xl font-semibold font-body')
  $(element).wrap('<div class="bg-slate-100 mb-5 mt-20 flex"></div>')
  $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
  })

  $('h2').each((_, element) => {
  $(element).html()
  $(element).addClass('ml-4 my-2 text-xl font-semibold font-body')
  $(element).wrap('<div class="my-8 flex"></div>')
  $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
  })

  $('p').each((_, element) => {
  $(element).html()
  $(element).addClass('text-lg font-body leading-loose')
  $(element).wrap('<div class="my-5></div>')
  })

  $('img').each((_, element) => {
  $(element).html();
  $(element).addClass("")
  });

  $('a').each((_, element) => {
  $(element).html();
  $(element).addClass("")
  });

  $('h1').each((_, element) => {
  $(element).html();
  $(element).addClass("")
  });

  return {
    props: {
      blog: data,
      content: $.html(),
      categories: categories.contents
    },
  };
};
