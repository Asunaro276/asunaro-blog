import cheerio from 'cheerio'
import hljs from 'highlight.js/lib/common'

export const parseCode = (code: string, fileName: string) => {
  const $ = cheerio.load(code)
  $('pre code').each((_, element) => {
    const result = hljs.highlightAuto($(element).text()).value
    $(element).html(result)
    $(element).parent().addClass('relative shadow-md')
    $(element)
      .parent()
      .prepend(`<p class="absolute my-0 p-1 text-white bg-slate-500">${fileName}</p>`)
    $(element).addClass(`hljs pt-14 mb-10`)
  })
  return $('body').html()
}
