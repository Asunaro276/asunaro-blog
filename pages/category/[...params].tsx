import HomePage from "components/HomePage";
import { newtClient } from "libs/client";
import { fetchArticles } from "libs/fetchArticles";
import { GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { PER_PAGE } from "pages";
import { ParsedUrlQuery } from "querystring";
import { ArticleResponse, CategoryResponse, TagResponse } from "types"

type Props = {
  blogs: ArticleResponse[]
  categories: CategoryResponse[]
  category: CategoryResponse
  tags: TagResponse[]
  years: { [key: number]: number }
  totalCount: number
  pageNumber: number
}

interface Params extends ParsedUrlQuery {
  params: string[]
}

export default function CategoryResponseId(props: Props) {
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
        title={props.category.displayedName}
      />
      <HomePage
        totalCount={props.totalCount}
        pageNumber={props.pageNumber}
        blogs={props.blogs}
        categories={categories}
        tags={props.tags}
        years={props.years}
        category={props.category}
      />
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const categories = (await newtClient.getContents<CategoryResponse>({ appUid: "asunaroblog", modelUid: "category", query: { limit: 100 }})).items
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  let paths = []
  for (const category of categories) {
    const countPerCategory = (await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { category: category._id, select: ["total"] }})).total
    paths.push(`/category/${category._id}`)
    paths.push(...range(1, Math.ceil(countPerCategory / PER_PAGE))
    .map((pageNumber) => `/category/${category._id}/${pageNumber}`))
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const categoryId = context.params!.params[0]
  const pageNumber = context.params?.params.length === 1 ? 1 : Number(context.params!.params[1])
  console.log(context.params)
  // const blogs = await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { "category": categoryId, skip: (pageNumber - 1) * PER_PAGE, limit: PER_PAGE }})
  // const categories = (await newtClient.getContents<CategoryResponse>({ appUid: "asunaroblog", modelUid: "category", query: { order: ["-_sys.customOrder"] }})).items
  // const tags = (await newtClient.getContents<TagResponse>({ appUid: "asunaroblog", modelUid: "tag", query: { limit: 100 }})).items

  // // タグごとのポスト数を入手
  // let propTags = []
  // for (const tag of tags) {
  //   const countTag = (await newtClient.getContents<TagResponse>({ appUid: "asunaroblog", modelUid: "article", query: { tags: { in: [tag._id] }, field: "total" }})).total
  //   propTags.push({
  //     ...tag,
  //     totalCount: countTag 
  //   })
  // }
  // propTags.sort((a, b) => Number(a.totalCount) < Number(b.totalCount) ? 1 : -1)
  // // 年ごとのポスト数を入手
  // let years: { [key: number]: number } = { 2022: 0, 2023: 0 }
  // for (const y in years) {
  //   years[y] = (await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { "_sys.raw.firstPublishedAt": { lt: String(Number(y) + 1), gte: y }, select: ["total"] }})).total
  // }

  const { blogs, categories, tags, years, totalCount } = await fetchArticles({ pageNumber: pageNumber, categoryId: categoryId })
  const category = categories.filter(cat => cat._id === categoryId)[0]

  return {
    props: {
      blogs,
      categories,
      tags,
      years,
      totalCount,
      pageNumber,
      category,
    },
  };
};