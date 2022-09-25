import * as cheerio from 'cheerio'
import { BlogBody, Heading, Paragraph } from 'types'

const parsePostHeading = (html: string) => {
  const $ = cheerio.load(html)
  const headings = $('h1, h2, h3').toArray()
  const toc: Heading[] = headings.map((data) => ({
      text: (data.children[0] as unknown as Text).data,
      tag: data.name,
      id: data.attribs.id,
    })
  )
  return toc
}

export const parsePostBody = (body: BlogBody) => {
  const parsedBody = body.map(data => {
    if (data.fieldId === "paragraph") {
      return parsePostHeading(((data as Paragraph).paragraph))
    }
  })
  return parsedBody.flat().filter(Boolean) as Heading[]
}