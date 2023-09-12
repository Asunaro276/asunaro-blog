import HomePage from "components/HomePage";
import { newtClient } from "libs/client";
import { fetchBlogData } from "libs/fetch/fetchBlogData";
import { GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { PER_PAGE } from "pages";
import { ParsedUrlQuery } from "querystring";
import { ArticleResponse, CategoryResponse, TagResponse } from "types"

type Props = {
  blogs: ArticleResponse[]
  categories: CategoryResponse[]
  tags: TagResponse[]
  years: { [key: number]: number }
  tag: TagResponse
  pageNumber: number
  totalCount: number
}

interface Params extends ParsedUrlQuery {
  params: string[]
}

export default function TagResponseId(props: Props) {
  return (
    <div>
      <NextSeo
        title={props.tag.tag}
      />
      <HomePage
        pageNumber={props.pageNumber}
        totalCount={props.totalCount}
        blogs={props.blogs}
        categories={props.categories}
        tags={props.tags}
        years={props.years}
        tag={props.tag}
      />
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const tags = (await newtClient.getContents<TagResponse>({ appUid: "asunaroblog", modelUid: "tag", query: { limit: 100 }})).items
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  let paths = []
  for (const tag of tags) {
    const countEachTag = (await newtClient.getContents({ appUid: "asunaroblog", modelUid: "article", query: { tags: { in: [tag._id] }, select: ["total"] }})).total
    paths.push(`/tag/${tag._id}`)
    paths.push(...range(1, Math.ceil(countEachTag / PER_PAGE))
    .map((pageNumber) => `/tag/${tag._id}/${pageNumber}`))
  }
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const tagId = context.params!.params[0]
  const pageNumber = context.params?.params.length === 1 ? 1 : Number(context.params!.params[1])

  const { blogs, categories, tags, years, totalCount } = await fetchBlogData({ tagId: tagId, pageNumber: pageNumber })
  const tag = tags.filter(tag => tag._id === tagId).pop() as TagResponse

  return {
    props: {
      blogs,
      categories,
      tags,
      years,
      totalCount,
      tag,
      pageNumber,
    },
  };
};