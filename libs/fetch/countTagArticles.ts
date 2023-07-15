import { newtClient } from "libs/client";
import { ArticleResponse, TagResponse } from "types";

export const countTagArticles = async (tags: TagResponse[]): Promise<TagResponse[]> => {
  return (await Promise.all(tags.map(async tag => ({
    ...tag,
    totalCount: (await newtClient.getContents<ArticleResponse>({
      appUid: 'asunaroblog',
      modelUid: 'article',
      query: { tags: { in: [tag._id] }, field: 'total' },
    })).total    
  })))).sort((a, b) => (Number(a.totalCount) < Number(b.totalCount) ? 1 : -1));
}