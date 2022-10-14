import { client } from "libs/client";
import { Blog, Category } from "types";
import CodeIcon from '@mui/icons-material/Code';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BusinessIcon from '@mui/icons-material/Business';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import HomePage from "components/HomePage/HomePage";
import { PER_PAGE } from "components/HomePage/elements/PaginationButton";

type Props = {
  blogs: Blog[]
  categories: Category[]
  totalCount: number
}

export const pageIcons = [<HomeOutlinedIcon key={0} />, <CodeIcon key={1} />, <BusinessIcon key={2} />, <QueryStatsIcon key={3} />, <MoreHorizIcon key={4} />]

export default function Home(props: Props) {
  const homeCategory: Category = { id: "/", displayedName: "Home", name: "home" }
  const categories = [
    homeCategory,
    ...props.categories.map((category) => ({
      ...category,
      id: `/blog/category/${category.id}`,
    }))
  ]
  return (
    <main>
      <HomePage
        pageNumber={1}
        blogs={props.blogs}
        categories={categories}
        totalCount={props.totalCount}
      />
    </main>
  );
}


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: PER_PAGE} })
  const categoryData = await client.get({ endpoint: "categories" })

  return {
    props: {
      blogs: data.contents,
      categories: categoryData.contents,
      totalCount: data.totalCount
    },
  };
};
