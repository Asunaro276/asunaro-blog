import { newtClient } from 'libs/client'
import { TagItem } from 'types'

export const fetchTags = async (): Promise<TagItem[]> => {
  const tags = (
    await newtClient.getContents<TagItem>({
      appUid: 'asunaroblog',
      modelUid: 'tag',
      query: {
        limit: 100,
        depth: 0
      },
    })
  ).items
  return tags
}
