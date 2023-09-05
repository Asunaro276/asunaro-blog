import cheerio from 'cheerio'
import openGraphScraper from 'open-graph-scraper'
import hljs from 'highlight.js/lib/common'
import axios, { AxiosError } from 'axios'
import { ImageObject } from 'open-graph-scraper/dist/lib/types'

export const parseBody = async (body: string) => {
  const $ = cheerio.load(body)
  $("h1").each((_, element) => {
    $(element).attr("id", $(element).text() + "h1")
    $(element).addClass('ml-8 my-3 md:my-5 text-lg md:text-xl font-semibold font-body')
    $(element).wrap('<div class="bg-slate-100 mb-5 mt-20 flex"></div>')
    $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
  })
  $("h2").each((_, element) => {
    $(element).attr("id", $(element).text() + "H2")
    $(element).addClass('ml-4 my-2 text-base md:text-lg font-semibold font-body')
    $(element).wrap('<div class="mb-5 flex"></div>')
    $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
  })
  $('p').each((_, element) => {
    $(element).addClass('md:text-lg font-body leading-loose')
    $(element).wrap('<div class="mt-5 mb-10"></div>')
  })

  $('li').each((_, element) => {
    $(element).addClass('font-body')
  })

  $('ol').each((_, element) => {
    $(element).addClass('md:text-lg list-inside space-y-2 ml-2 pl-8 indent-[-1em]')
  })

  $('ul:not(ul ul)').each((_, element) => {
    $(element).addClass('md:text-lg list-disc list-inside space-y-2 ml-2 pl-8 pr-4 py-6 indent-[-1em] border-dotted border-gray-500')
  })

  $('ul ul').each((_, element) => {
    $(element).addClass('md:text-lg list-inside space-y-2 ml-2 pl-4 indent-[-1em]')
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
    $(element).addClass('max-w-[90%]')

  })

  $('pre code').each((_, element) => {
    const result = hljs.highlightAuto($(element).text()).value
    $(element).html(result)
    $(element).parent().addClass("shadow-md text-sm md:text-base")
    $(element).addClass(`hljs mb-10`)
  })

  const links = $('a')
  for (let i = 0; i < links.length; i++) {
    const element = $(links[i])
    if ($(element).text() === "linkCard") {
      let og: { [key: string]: string } = {}
      const linkUrl = $(element).attr("href") as string
      try {
        const ogData = await openGraphScraper({ url: linkUrl })
        og['title'] = ogData.result['ogTitle'] as string
        if (og['title'].match(/Amazon/)) {
          og["image"] = (ogData.result["ogImage"] as ImageObject[]).find(value => value.url.match(/media-amazon.com\/images\/I/))?.url as string
        } else {
          og['image'] = (ogData.result["ogImage"] as ImageObject[])[0].url as string
        }
        if (og['image'] === undefined) {
          og['image'] = ogData.result['favicon'] as string
        }
        if (!og['image'].startsWith('http')) {
          og['image'] = `${linkUrl.split('/').slice(0,3).join('/')}${og['image']}`
        }
        og['description'] = ogData.result['ogDescription'] as string
      } catch (error) {
        console.log(error)
      }
      if (og["title"] === undefined) {
        const res = await fetch(linkUrl)
        const data = await res.text()
        const $link = cheerio.load(data)
        $link('meta[property^="og"]').each((_, element) => {
          og[$link(element).attr("property")?.replace("og:", "") as string] = ($link(element).attr("content") as string)
        })
        if (og["image"] === undefined) {
          og["image"] = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${linkUrl}`
        }
        $link('meta[name="title"]').each((_, element) => {
          if (og[$link(element).attr("name") as string] === undefined) {
            og[$link(element).attr("name") as string] = ($link(element).attr("content") as string)
          }
        })
        if (og["title"] === undefined) {
          $link('title').each((_, element) => {
            og["title"] = $link(element).text() as string
          })
        }
        $link('meta[name="description"]').each((_, element) => {
          if (og[$link(element).attr("name") as string] === undefined) {
            og[$link(element).attr("name") as string] = ($link(element).attr("content") as string)
          }
        })
      }
      $(element).replaceWith(`
        <div class="shadow-md shadow-outline bg-slate-100 mt-4 mb-20 hover:brightness-[0.9] duration-300 ease-out">
          <a class="no-underline" href=${linkUrl} target="_blank" rel="noopener noreferrer">
            <div class="flex flex-col lg:flex-row items-center justify-center p-2">
              <img src=${og["image"] === undefined ? "" : og["image"]} class="self-center w-[90%] max-w-[12rem] max-h-[20rem] mt-2 lg:mt-2 lg:mr-3" />
              <div class="flex flex-col w-[90%] lg:w-1/2 justify-center items-center">
                <p class="font-bold my-3 w-full break-words">
                  ${og["title"] === undefined ? "" : og["title"]}
                </p> 
                <p class="text-sm text-black m-0 w-full break-words">
                  ${og["description"] === undefined ? "" : og["description"]}
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