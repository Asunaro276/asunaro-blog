import CategoryPage from "components/HomePage/CategoryPage";
import { client } from "libs/client";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { Blog, Category } from "types"

type Props = {
  blogs: Blog[]
  categories: Category[]
  categoryName: string
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function CategoryId(props: Props) {
  console.log(props)
  return (
    <div>
      <CategoryPage
        blogs={props.blogs}
        categories={props.categories}
        categoryName={props.categoryName}
      />
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: "categories" });

  const paths = data.contents.map((content: Category) => `/blog/category/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const categoryId = context.params!.categoryId
  const data = await client.get({ endpoint: "blog", queries: { filters: `category[equals]${categoryId}` } })
  const categoryData = await client.get({ endpoint: "categories" })
  const categoryName = categoryData.contents.filter((category: Category) => category.id === categoryId)[0].name

  return {
    props: {
      // blogs: (data.contents as Blog[]).filter((blog) => blog.category.id === id),
      blogs: data.contents as Blog[],
      categories: categoryData.contents as Category[],
      categoryName: categoryName
    },
  };
};