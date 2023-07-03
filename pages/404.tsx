import { newtClient } from "libs/client";
import { ArticleResponse, CategoryResponse, TagResponse } from "types";
import CodeIcon from '@mui/icons-material/Code';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BusinessIcon from '@mui/icons-material/Business';
import FunctionsIcon from '@mui/icons-material/Functions';
import HomePage from "components/HomePage";
import { NextSeo } from "next-seo";

type Props = {
  blogs: ArticleResponse[]
  categories: CategoryResponse[]
  tags: TagResponse[]
  years: { [key: number]: number }
  totalCount: number
}

export const PER_PAGE = 10

export const pageIcons = [<HomeOutlinedIcon key={0} />, <CodeIcon key={1} />, <BusinessIcon key={2} />, <FunctionsIcon key={3} />, <MoreHorizIcon key={4} />]

export default function Custom404(props: Props) {
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
        title="asunaroblog｜Web技術で遊ぶブログ"
        titleTemplate="%s"
      />
      <HomePage
        pageNumber={1}
        blogs={props.blogs}
        categories={categories}
        tags={props.tags}
        years={props.years}
        totalCount={props.totalCount}
        statusCode={404}
      />
    </main>
  );
}


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  if (process.env.NODE_ENV === "development") {
    
  }
  // const blogs = await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { skip: 0, limit: PER_PAGE} })
  const categories = await newtClient.getContents<CategoryResponse>({ appUid: "asunaroblog", modelUid: "category", query: { order: ["-_sys.customOrder"] }})
  const tags = (await newtClient.getContents<TagResponse>({ appUid: "asunaroblog", modelUid: "tag", query: { limit: 100 }})).items
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
  let years: { [key: number]: number } = { 2023: 0 }
  for (const y in years) {
    years[y] = (await newtClient.getContents<ArticleResponse>({ appUid: "asunaroblog", modelUid: "article", query: { "_sys.raw.firstPublishedAt": { lt: String(Number(y) + 1), gte: y }, select: ["total"] }})).total
  }

  return {
    props: {
      blogs: [],
      categories: categories.items,
      tags: propTags,
      years: years,
      totalCount: 1,
    },
  };
};
