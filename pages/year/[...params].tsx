import HomePage from "components/HomePage";
import { client } from "libs/client";
import { GetStaticProps, GetStaticPaths } from "next";
import { PER_PAGE } from "pages";
import { ParsedUrlQuery } from "querystring";
import { Blog, Category, Tag } from "types"

type Props = {
  blogs: Blog[]
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
  const homeCategory: Category = { id: "/", displayedName: "Home", name: "home" }
  const categories = [
    homeCategory,
    ...props.categories.map((category) => ({
      ...category,
      id: `/category/${category.id}`,
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
    const countPerYear = (await client.get({ endpoint: "blog", queries: { filters: `publishedAt[contains]${year}`, fields: "totalCount" }})).totalCount
    paths.push(`/year/${year}`)
    paths.push(...range(1, Math.ceil(countPerYear / PER_PAGE))
    .map((pageNumber) => `/year/${year}/${pageNumber}`))
  }
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const year = Number(context.params!.params[0])
  const pageNumber = context.params?.params.length === 1 ? 1 : Number(context.params!.params[1])
  const blogs = await client.get({ endpoint: "blog", queries: { filters: `publishedAt[contains]${year}`, offset: (pageNumber - 1) * PER_PAGE, limit: PER_PAGE }})
  const categories = await client.get({ endpoint: "categories" })
  const tags = (await client.get({ endpoint: "tags", queries: { limit: 100 } })).contents as Tag[]
  // タグごとのポスト数を入手
  let propTags = []
  for (const tag of tags) {
    const countTag = (await client.get({ endpoint: "blog", queries: { filters: `tags[contains]${tag.id}`, fields: "totalCount" }})).totalCount
    propTags.push({
      ...tag,
      tagTotalCount: countTag 
    })
  }
  propTags.sort((a, b) => Number(a.tagTotalCount) < Number(b.tagTotalCount) ? 1 : -1)

  // 年ごとのポスト数を入手
  let years: { [key: number]: number } = { 2022: 0, 2023: 0 }
  for (const y in years) {
    years[y] = (await client.get({ endpoint: "blog", queries: { filters: `publishedAt[contains]${y}`, fields: "totalCount" }})).totalCount
  }

  return {
    props: {
      blogs: blogs.contents as Blog[],
      categories: categories.contents as Category[],
      tags: propTags as Tag[],
      years: years,
      year: year,
      pageNumber: pageNumber,
      totalCount: blogs.totalCount,
    },
  };
};