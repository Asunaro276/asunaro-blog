import HomePage from "components/HomePage";
import { newtClient } from "libs/client";
import { GetStaticProps, GetStaticPaths } from "next";
import { PER_PAGE } from "pages";
import { ParsedUrlQuery } from "querystring";
import { Article, Category, Tag } from "types"

type Props = {
  blogs: Article[]
  categories: Category[]
  tags: Tag[]
  years: { [key: number]: number }
  year: number,
  pageNumber: number
  totalCount: number
}

interface Params extends ParsedUrlQuery {
  params: string[]
}

export default function YearId(props: Props) {
  const homeCategory: Category = { _id: "/", displayedName: "Home", name: "home" }
  const categories = [
    homeCategory,
    ...props.categories.map((category) => ({
      ...category,
      _id: `/category/${category._id}`,
    }))
  ]
  return (
    <div>
      <HomePage
        pageNumber={props.pageNumber}
        totalCount={props.totalCount}
        blogs={props.blogs}
        categories={categories}
        tags={props.tags}
        years={props.years}
        year={props.year}
      />
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  const years = range(2022, 2023)
  let paths = []
  for (const year of years) {
    const countPerYear = (await newtClient.getContents<Article>({ appUid: "asunaroblog", modelUid: "article", query: { "_sys.raw.firstPublishedAt": { lt: String(year+1), gte: String(year) }, select: ["total"] }})).total

    paths.push(`/year/${year}`)
    paths.push(...range(1, Math.ceil(countPerYear / PER_PAGE))
    .map((pageNumber) => `/year/${year}/${pageNumber}`))
  }
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const year = Number(context.params!.params[0])
  const blogs = await newtClient.getContents<Article>({ appUid: "asunaroblog", modelUid: "article", query: { skip: 0, limit: PER_PAGE} })
  const categories = await newtClient.getContents<Category>({ appUid: "asunaroblog", modelUid: "category", query: { order: ["-_sys.customOrder"] }})
  const tags = (await newtClient.getContents<Tag>({ appUid: "asunaroblog", modelUid: "tag", query: { limit: 100 }})).items
  const pageNumber = context.params?.params.length === 1 ? 1 : Number(context.params!.params[1])

  // タグごとのポスト数を入手
  let propTags: Tag[] = []
  for (const tag of tags) {
    const countTag = (await newtClient.getContents<Article>({ appUid: "asunaroblog", modelUid: "article", query: { tags: { in: [tag._id] } , field: "total" }})).total
    propTags.push({
      ...tag,
      tagTotalCount: countTag 
    })
  }
  propTags.sort((a, b) => Number(a.tagTotalCount) < Number(b.tagTotalCount) ? 1 : -1)
  // 年ごとのポスト数を入手
  let years: { [key: number]: number } = { 2022: 0, 2023: 0 }
  for (const y in years) {
    years[y] = (await newtClient.getContents<Article>({ appUid: "asunaroblog", modelUid: "article", query: { "_sys.raw.firstPublishedAt": { lt: String(Number(y) + 1), gte: y }, select: ["total"] }})).total
  }

  return {
    props: {
      blogs: blogs.items,
      categories: categories.items,
      tags: propTags,
      years: years,
      year: year,
      pageNumber: pageNumber,
      totalCount: blogs.total,
    },
  };
};