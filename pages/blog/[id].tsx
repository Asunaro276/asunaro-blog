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
        const $ = cheerio.load((value as Paragraph).paragraph)
        $("h1").each((_, element) => {
          $(element).addClass('ml-8 my-5 text-3xl font-semibold font-body')
          $(element).wrap('<div class="bg-slate-100 mb-5 mt-20 flex"></div>')
          $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
        })
        $("h2").each((_, element) => {
          $(element).addClass('ml-4 my-2 text-xl font-semibold font-body')
          $(element).wrap('<div class="my-8 flex"></div>')
          $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
        })

        $('p').each((_, element) => {
          $(element).addClass('text-lg font-body leading-loose')
          $(element).wrap('<div class="my-5"></div>')
        })

        $('ul').each((_, element) => {
          $(element).addClass('list-disc list-inside text-lg space-y-2 ml-6 pl-4 indent-[-1em]')
        })

        $('blockquote').each((_, element) => {
          $(element).addClass('ml-4 text-xl opacity-90 font-body')
          $(element).wrap('<div class="flex"></div>')
          $(element).parent().prepend('<div class="w-2 bg-slate-200"></div>')
        })
        return $("body").html()
      case "code":
        const $c = cheerio.load((value as Code).code)
        $c('pre code').each((_, element) => {
          const result = hljs.highlightAuto($c(element).text()).value
          $c(element).html(result)
          $c(element).wrap('<div class="hljs pt-14 pb-6 pl-4"></div>')
          $c(element).parent().prepend(`<p class=absolute text-center inline-block px-2 text-white bg-slate-500>
                                          ${(value as Code).fileName}
                                      </p>`)
        })
        return $c("body").html()
      case "link":
        const linkBody = String.raw`
        <div class="shadow shadow-outline bg-slate-50 my-4 hover:brightness-[0.9] duration-300 ease-out">
          <a class="p-4" href=${(value as Link).url} target="_blank" rel="noopener noreferrer">
            <div class="flex justify-evenly flex-wrap">
              <img src=${(value as Link).image.url} class="w-40" />
              <div class="flex flex-col w-2/3 justify-center items-center space-y-5">
                <p class="text-lg text-blue-700 underline">
                  ${(value as Link).title}
                </p> 
              </div>
            </div>
          </a>
        </div>
        `
        console.log(linkBody)
        return linkBody
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
