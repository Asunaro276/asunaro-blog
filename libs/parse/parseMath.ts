import cheerio from 'cheerio'

export const parseMath = (formula: string) => {
  const html = String.raw`<div>${formula}</div>`
  return html
}