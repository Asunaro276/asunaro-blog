import TagPage from "components/HomePage/TagPage";
import { client } from "libs/client";
import { GetStaticProps, GetStaticPaths } from "next";
import { PER_PAGE } from "pages";
import { ParsedUrlQuery } from "querystring";
import { Blog, Category, Tag } from "types"

type Props = {
  blogs: Blog[]
  categories: Category[]
  tags: Tag[]
  tag: Tag
  pageNumber: number
  totalCount: number
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
      <TagPage
        pageNumber={props.pageNumber}
        totalCount={props.totalCount}
        blogs={props.blogs}
        categories={categories}
        tags={props.tags}
        tag={props.tag}
      />
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const tags = (await client.get({ endpoint: "tags" })).contents as Tag[]
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  let paths = []
  for (const tag in tags) {
    const blogs = await client.get({ endpoint: "blog", queries: { filters: `tags[contains]${tags[tag].id}` }})
    paths.push(`/tag/${tags[tag].id}`)
    // paths.push(...range(1, 10)
    paths.push(...range(1, Math.ceil(blogs.totalCount / PER_PAGE))
    .map((pageNumber) => `/tag/${tags[tag].id}/${pageNumber}`))
  }
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const tagId = context.params!.params[0]
  const pageNumber = context.params?.params.length === 1 ? 1 : Number(context.params!.params[1])
  const blogs = await client.get({ endpoint: "blog", queries: { filters: `tags[contains]${tagId}` } })
  const categories = await client.get({ endpoint: "categories" })
  const tags = (await client.get({ endpoint: "tags" })).contents as Tag[]
  const tag = tags.filter(tag => tag.tag)[0]
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
      tag: tag as Tag, 
      pageNumber: pageNumber,
      totalCount: blogs.totalCount,
    },
  };
};