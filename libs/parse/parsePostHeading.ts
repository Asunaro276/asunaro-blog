import * as cheerio from 'cheerio'
import { BlogBody, Heading, Paragraph } from 'types'

export const parsePostHeading = (html: string) => {
  if (!html) {
    html = ""
  }
  const $ = cheerio.load(html)
  const headings = $('h1, h2, h3').toArray()
  const toc: Heading[] = headings.map((data: any) => ({
      text: data.children[0].data,
      tag: data.name,
      id: data.attribs.id,
    })
  )
  return toc
}
