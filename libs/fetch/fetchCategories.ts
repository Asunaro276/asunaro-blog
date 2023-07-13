import { newtClient } from "libs/client";
import { CategoryResponse } from "types";

export const fetchCategories = async (): Promise<CategoryResponse[]> => {
  const categories = (
    await newtClient.getContents<CategoryResponse>({
      appUid: 'asunaroblog',
      modelUid: 'category',
      query: { order: ['-_sys.customOrder'] },
    })
  ).items;
  return categories
}
