import { newtClient } from 'libs/client'
import { TagResponse } from 'types'

export const fetchTags = async (): Promise<TagResponse[]> => {
  const tags = (
    await newtClient.getContents<TagResponse>({
      appUid: 'asunaroblog',
      modelUid: 'tag',
      query: { limit: 100 },
    })
  ).items
  return tags
}
