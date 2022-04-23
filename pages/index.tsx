import HomePage from "components/templates/HomePage";
import { client } from "libs/client";
import { Blog, Category } from "types";
import CodeIcon from '@mui/icons-material/Code';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type Props = {
  blogs: Blog[]
  categories: Category[]
}

export const pages = ["Home", "プログラミング", "その他"]
export const linkTo = ["/", "programming", "other"]
export const pageIcons = [<HomeOutlinedIcon />, <CodeIcon />, <MoreHorizIcon />]

export default function Home(props: Props) {
  return (
    <main>
      <HomePage
        blogs={props.blogs}
        categories={props.categories}
      />
    </main>
  );
}


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" })
  const categoryData = await client.get({ endpoint: "categories" })

  return {
    props: {
      blogs: data.contents,
      categories: categoryData.contents
    },
  };
};
