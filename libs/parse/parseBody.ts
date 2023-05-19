import cheerio from 'cheerio'
import hljs from 'highlight.js/lib/common'
import axios, { AxiosError } from 'axios'

export const parseBody = async (body: string) => {
  const $ = cheerio.load(body)
  $("h1").each((_, element) => {
    $(element).attr("id", $(element).text() + "h1")
    $(element).addClass('ml-8 my-5 text-3xl font-semibold font-body')
    $(element).wrap('<div class="bg-slate-100 mb-5 mt-20 flex"></div>')
    $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
  })
  $("h2").each((_, element) => {
    $(element).attr("id", $(element).text() + "H2")
    $(element).addClass('ml-4 my-2 text-xl font-semibold font-body')
    $(element).wrap('<div class="mb-5 flex"></div>')
    $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
  })
  $('p').each((_, element) => {
    $(element).addClass('text-lg font-body leading-loose')
    $(element).wrap('<div class="mt-5 mb-10"></div>')
  })

  $('li').each((_, element) => {
    $(element).addClass('font-body')
  })

  $('ol').each((_, element) => {
    $(element).addClass('list-inside text-lg space-y-2 ml-6 pl-8 indent-[-1em]')
  })

  $('ul:not(ul ul)').each((_, element) => {
    $(element).addClass('list-disc list-inside text-lg space-y-2 ml-6 pl-8 py-6 indent-[-1em] border-dotted border-gray-500')
  })

  $('ul ul').each((_, element) => {
    $(element).addClass('list-inside text-lg space-y-2 ml-6 pl-4 indent-[-1em]')
    $(element).attr("style", "list-style-type: circle;")
  })

  $('code:not(pre code)').each((_, element) => {
    $(element).addClass("bg-slate-200 p-0.5 rounded text-red-500 font-thin")
  })

  $('blockquote').each((_, element) => {
    $(element).addClass('ml-4 text-xl opacity-90 font-body')
    $(element).wrap('<div class="flex"></div>')
    $(element).parent().prepend('<div class="w-2 bg-slate-200"></div>')
  })

  $('img').each((_, element) => {
    $(element).attr("width", "90%")
  })

  $('pre code').each((_, element) => {
    const result = hljs.highlightAuto($(element).text()).value
    $(element).html(result)
    $(element).parent().addClass("shadow-md")
    $(element).addClass(`hljs mb-10`)
  })

  const links = $('a')
  for (let i = 0; i < links.length; i++) {
    const element = $(links[i])
    if ($(element).text() === "linkCard") {
      let og: { [key: string]: string } = {}
      const linkUrl = $(element).attr("href") as string
        const res = await fetch(linkUrl)
        const data = await res.text()
        const $link = cheerio.load(data)
        $link('meta[property^="og"]').each((_, element) => {
          og[$link(element).attr("property")?.replace("og:", "") as string] = ($link(element).attr("content") as string)
        })
        $link('meta[name]').each((_, element) => {
          if (og[$link(element).attr("name") as string] === undefined) {
            og[$link(element).attr("name") as string] = ($link(element).attr("content") as string)
          }
        })
        const amazonImage = $link('img.frontImage').attr("src")
        $(element).replaceWith(`
          <div class="shadow-md shadow-outline bg-slate-100 mt-4 mb-20 hover:brightness-[0.9] duration-300 ease-out">
            <a class="p-4 no-underline" href=${linkUrl} target="_blank" rel="noopener noreferrer">
              <div class="flex flex-col md:flex-row justify-center">
                <img src=${og["image"] === undefined ? amazonImage : og["image"]} class="self-center w-[95%] md:w-1/2 px-3" />
                <div class="flex flex-col w-[95%] mx-3 md:w-5/12 justify-center items-center">
                  <p class="text-xl font-bold my-3 w-full break-words">
                    ${og["title"]}
                  </p> 
                  <p class="text-black my-1 w-full break-words">
                    ${og["description"]}
                  </p>
                </div>
              </div>
            </a>
          </div>
          `
        )
      }
    }
    return $("body").html() as string
  }