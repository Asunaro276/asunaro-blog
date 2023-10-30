import { newtClient } from 'libs/client'
import { ArticleItem, TagItem } from 'types'

export const countTagArticles = async (tags: TagItem[]): Promise<TagItem[]> => {
  return (
    await Promise.all(
      tags.map(async (tag) => ({
        ...tag,
        totalCount: (
          await newtClient.getContents<ArticleItem>({
            appUid: 'asunaroblog',
            modelUid: 'article',
            query: { tags: { in: [tag._id] }, field: 'total' },
          })
        ).total,
      })),
    )
  ).sort((a, b) => (Number(a.totalCount) < Number(b.totalCount) ? 1 : -1))
}
