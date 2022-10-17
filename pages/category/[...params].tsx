import CategoryPage from "components/HomePage/CategoryPage";
import { client } from "libs/client";
import { GetStaticProps, GetStaticPaths } from "next";
import { PER_PAGE } from "pages";
import { ParsedUrlQuery } from "querystring";
import { Blog, Category, Tag } from "types"

type Props = {
  blogs: Blog[]
  categories: Category[]
  tags: Tag[]
  totalCount: number
  pageNumber: number
}

interface Params extends ParsedUrlQuery {
  params: string[]
}

export default function CategoryId(props: Props) {
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
      <CategoryPage
        totalCount={props.totalCount}
        pageNumber={props.pageNumber}
        blogs={props.blogs}
        categories={categories}
        tags={props.tags}
      />
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const categories = (await client.get({ endpoint: "categories" })).contents as Category[]
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  let paths = []
  for (const category in categories) {
    const blogs = await client.get({ endpoint: "blog", queries: { filters: `category[equals]${categories[category].id}` }})
    paths.push(`/category/${categories[category].id}`)
    paths.push(...range(1, Math.ceil(blogs.totalCount / PER_PAGE))
    .map((pageNumber) => `/category/${categories[category].id}/${pageNumber}`))
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const categoryId = context.params!.params[0]
  const pageNumber = context.params?.params.length === 1 ? 1 : Number(context.params!.params[1])
  const blogs = await client.get({ endpoint: "blog", queries: { filters: `category[equals]${categoryId}`, offset: (pageNumber - 1) * PER_PAGE, limit: PER_PAGE } })
  const categories = await client.get({ endpoint: "categories" })
  const tags = (await client.get({ endpoint: "tags" })).contents as Tag[]
  let propTags = []
  for (const tag of tags) {
    const tagBlogs = await client.get({ endpoint: "blog", queries: { filters: `tags[contains]${tag.id}` } })
    const tagTotalCount = tagBlogs.totalCount
    propTags.push({
      ...tag,
      tagTotalCount: tagTotalCount
    })
  }

  return {
    props: {
      blogs: blogs.contents as Blog[],
      categories: categories.contents as Category[],
      tags: propTags as Tag[],
      totalCount: blogs.totalCount,
      pageNumber: pageNumber,
    },
  };
};