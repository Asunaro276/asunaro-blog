import HomePage from "components/HomePage";
import { newtClient } from "libs/client";
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
  const homeCategory: CategoryResponse = { _id: "/", displayedName: "HOME", name: "home" }
  const categories = [
    homeCategory,
    ...props.categories.map((category) => ({
      ...category,
      _id: `/category/${category._id}`,
    }))
  ]
  return (
    <div>
      <NextSeo
        title={props.tag.tag}
      />
      <HomePage
        pageNumber={props.pageNumber}
        totalCount={props.totalCount}
        blogs={props.blogs}
        categories={categories}
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
    const countEachTag = (await newtClient.getContents({ appUid: "asunaroblog", modelUid: "article", query: { tags: { in: [tag._id] }, field: "totalCount" }})).total
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
  const blogs = await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { tags: { in: [tagId] }, skip: (pageNumber - 1) * PER_PAGE, limit: PER_PAGE }})
  const categories = await newtClient.getContents<CategoryResponse>({ appUid: "asunaroblog", modelUid: "category", query: { order: ["-_sys.customOrder"] }})
  const tags = (await newtClient.getContents<TagResponse>({ appUid: "asunaroblog", modelUid: "tag", query: { limit: 100 } })).items
  const tag = tags.filter(tag => tag._id === tagId).pop()

  // タグごとのポスト数を入手
  let propTags: TagResponse[] = []
  for (const tag of tags) {
    const countTag = (await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { tags: { in: [tag._id] } , field: "total" }})).total
    propTags.push({
      ...tag,
      tagTotalCount: countTag 
    })
  }
  propTags.sort((a, b) => Number(a.tagTotalCount) < Number(b.tagTotalCount) ? 1 : -1)
  // 年ごとのポスト数を入手
  let years: { [key: number]: number } = { 2022: 0, 2023: 0 }
  for (const y in years) {
    years[y] = (await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { "_sys.raw.firstPublishedAt": { lt: String(Number(y) + 1), gte: y }, select: ["total"] }})).total
  }

  return {
    props: {
      blogs: blogs.items,
      categories: categories.items,
      tags: propTags,
      years: years,
      tag: tag as TagResponse, 
      pageNumber: pageNumber,
      totalCount: blogs.total,
    },
  };
};