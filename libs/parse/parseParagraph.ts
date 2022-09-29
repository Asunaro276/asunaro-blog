import cheerio from 'cheerio'

export const parseParagraph = (paragraph: string) => {
  const $ = cheerio.load(paragraph)
  $("h1").each((_, element) => {
    $(element).addClass('ml-8 my-5 text-3xl font-semibold font-body')
    $(element).wrap('<div class="bg-slate-100 mb-5 mt-20 flex"></div>')
    $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
  })
  $("h2").each((_, element) => {
    $(element).addClass('ml-4 my-2 text-xl font-semibold font-body')
    $(element).wrap('<div class="mb-8 mt-8 flex"></div>')
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
}