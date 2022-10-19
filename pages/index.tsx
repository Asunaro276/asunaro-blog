import { client } from "libs/client";
import { Blog, Category, Tag } from "types";
import CodeIcon from '@mui/icons-material/Code';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BusinessIcon from '@mui/icons-material/Business';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import HomePage from "components/HomePage/HomePage";

type Props = {
  blogs: Blog[]
  categories: Category[]
  tags: Tag[]
  totalCount: number
}

export const PER_PAGE = 10

export const pageIcons = [<HomeOutlinedIcon key={0} />, <CodeIcon key={1} />, <BusinessIcon key={2} />, <QueryStatsIcon key={3} />, <MoreHorizIcon key={4} />]

export default function Home(props: Props) {
  const homeCategory: Category = { id: "/", displayedName: "Home", name: "home" }
  const categories = [
    homeCategory,
    ...props.categories.map((category) => ({
      ...category,
      id: `/category/${category.id}`,
    }))
  ]
  return (
    <main>
      <HomePage
        pageNumber={1}
        blogs={props.blogs}
        categories={categories}
        tags={props.tags}
        totalCount={props.totalCount}
      />
    </main>
  );
}


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: PER_PAGE} })
  const categories = await client.get({ endpoint: "categories" })
  const tags = (await client.get({ endpoint: "tags", queries: { limit: 100 }})).contents as Tag[]
  let propTags = []
  for (const tag of tags) {
    const tagBlogs = await client.get({ endpoint: "blog", queries: { filters: `tags[contains]${tag.id}` } })
    const tagTotalCount = tagBlogs.totalCount
    propTags.push({
      ...tag,
      tagTotalCount: tagTotalCount
    })
  }
  propTags.sort((a, b) => Number(a.tagTotalCount) < Number(b.tagTotalCount) ? 1 : -1)

  return {
    props: {
      blogs: data.contents as Blog[],
      categories: categories.contents as Category[],
      tags: propTags as Tag[],
      totalCount: data.totalCount
    },
  };
};
