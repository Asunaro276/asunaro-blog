import { newtClient } from 'libs/client'
import { CategoryItem } from 'types'

export const fetchCategories = async (): Promise<CategoryItem[]> => {
  const categories = (
    await newtClient.getContents<CategoryItem>({
      appUid: 'asunaroblog',
      modelUid: 'category',
      query: { order: ['-_sys.customOrder'] },
    })
  ).items
  return categories
}
