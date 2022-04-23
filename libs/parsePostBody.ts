import * as cheerio from 'cheerio'

export const parsePostBody = (body: string) => {
  const $ = cheerio.load(body)
  const headings = $('h1, h2, h3, h4, h5, p, span').toArray()
  const toc = headings.map((data) => ({
    text: (data.children[0] as unknown as Text).data,
    tag: data.name,
    id: data.attribs.id,
  }))

  return toc
}