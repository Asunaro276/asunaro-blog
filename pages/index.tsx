import HomePage from "components/templates/HomePage";
import { client } from "libs/client";
import { Blog, Category } from "types";
import CodeIcon from '@mui/icons-material/Code';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PER_PAGE } from "components/organisms/PaginationButton";

type Props = {
  blogs: Blog[]
  categories: Category[]
  totalCount: number
}

export const pages = ["Home", "プログラミング", "その他"]
export const linkTo = ["/", "programming", "other"]
export const pageIcons = [<HomeOutlinedIcon />, <CodeIcon />, <MoreHorizIcon />]

export default function Home(props: Props) {
  return (
    <main>
      <HomePage
        pageNumber={1}
        blogs={props.blogs}
        categories={props.categories}
        totalCount={props.totalCount}
      />
    </main>
  );
}


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  // const data = await client.get({ endpoint: "blog" })
  const data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: PER_PAGE } })
  const categoryData = await client.get({ endpoint: "categories" })

  return {
    props: {
      blogs: data.contents,
      categories: categoryData.contents,
      totalCount: data.totalCount
    },
  };
};
