import HomePage from 'components/HomePage';
import { newtClient } from 'libs/client';
import { fetchBlogData } from 'libs/fetch/fetchBlogData';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { PER_PAGE } from 'pages';
import { ArticleResponse, CategoryResponse, TagResponse, Years } from 'types';

type Props = {
  pageNumber: number
  blogs: ArticleResponse[]
  categories: CategoryResponse[]
  tags: TagResponse[]
  years: Years
  totalCount: number
}

type Params = {
  pageNumber: string
}

// pages/blog/[id].js
export default function BlogPageId(props: Props) {
  const homeCategory: CategoryResponse = { _id: "/", displayedName: "HOME", name: "home" }
  const categories = [
    homeCategory,
    ...props.categories.map((category) => ({
      ...category,
      _id: `/category/${category._id}`,
    }))
  ]
  return (
    <main>
      <NextSeo
        title="asunaroblog"
        titleTemplate="%s"
      />
      <HomePage
        pageNumber={props.pageNumber}
        blogs={props.blogs}
        categories={categories}
        tags={props.tags}
        years={props.years}
        totalCount={props.totalCount}
      />
    </main>
  )
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const blogs = await newtClient.getContents({ appUid: "asunaroblog", modelUid: "article" });
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(1, Math.ceil(blogs.total/ PER_PAGE)).map((pageNumber) => `/${pageNumber}`)
  return { paths, fallback: false }
};

// データを取得
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const pageNumber = Number(context.params!.pageNumber)
  // const blogs = await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { skip: (pageNumber - 1) * PER_PAGE, limit: PER_PAGE } });
  // const categories = await newtClient.getContents<CategoryResponse>({ appUid: "asunaroblog", modelUid: "category", query: { order: ["-_sys.customOrder"] }})
  // const tags = (await newtClient.getContents<TagResponse>({ appUid: "asunaroblog", modelUid: "tag", query: { limit: 100 }})).items
  // // タグごとのポスト数を入手
  // let propTags: TagResponse[] = []
  // for (const tag of tags) {
  //   const countTag = (await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { tags: { in: [tag._id] } , field: "total" }})).total
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

  const { blogs, categories, tags, years, totalCount } = await fetchBlogData({ pageNumber: pageNumber })

  return {
    props: {
      blogs,
      categories,
      tags,
      years,
      totalCount,
      pageNumber,
    },
  };
};