import { newtClient } from 'libs/client'
import { ArticleItem, TagItem, Year, Years } from 'types'

export const countYearArticles = async (years: number[]): Promise<Years> => {
  const initialYears = years.reduce(
    (acc, year) => ({
      ...acc,
      [year]: 0,
    }),
    {},
  ) as Years

  return await Object.keys(initialYears).reduce(
    async (after, y) => ({
      ...after,
      [y]: (
        await newtClient.getContents<ArticleItem>({
          appUid: 'asunaroblog',
          modelUid: 'article',
          query: {
            '_sys.raw.firstPublishedAt': { lt: String(Number(y) + 1), gte: y },
            select: ['total'],
          },
        })
      ).total,
    }),
    {},
  )
}
