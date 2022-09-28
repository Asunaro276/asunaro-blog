import cheerio from 'cheerio'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/lib/common'
import 'highlight.js/styles/monokai.css'

export const parseCode = (code: string, fileName: string) => {
  const $ = cheerio.load(code)
  $('pre code').each((_, element) => {
    const result = hljs.highlightAuto($(element).text()).value
    $(element).html(result)
    $(element).addClass(`hljs pt-14`)
    $(element).parent().addClass("relative")
    $(element).parent().prepend(`<p class="absolute my-0 p-1 text-white bg-slate-500">${fileName}</p>`)
  })
  return $("body").html()
}