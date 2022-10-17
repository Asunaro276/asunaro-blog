import HomePage from 'components/HomePage/HomePage';
import { client } from 'libs/client';
import { GetStaticProps } from 'next';
import { PER_PAGE } from 'pages';
import { Blog, Category, Tag } from 'types';

type Props = {
  pageNumber: number
  blogs: Blog[]
  categories: Category[]
  tags: Tag[]
  totalCount: number
}

type Params = {
  pageNumber: string
}


// pages/blog/[id].js
export default function BlogPageId(props: Props) {
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
        pageNumber={props.pageNumber}
        blogs={props.blogs}
        categories={categories}
        tags={props.tags}
        totalCount={props.totalCount}
      />
    </main>
  )
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const blogs = await client.get({ endpoint: "blog" });
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(1, Math.ceil(blogs.totalCount / PER_PAGE)).map((pageNumber) => `/${pageNumber}`)
  return { paths, fallback: false }
};

// データを取得
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const pageNumber = Number(context.params!.pageNumber)
  const blogs = await client.get({ endpoint: "blog", queries: { offset: (pageNumber - 1) * PER_PAGE, limit: PER_PAGE } });
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
      pageNumber: pageNumber,
      blogs: blogs.contents as Blog[],
      categories: categories.contents as Category[],
      totalCount: blogs.totalCount,
      tags: propTags as Tag[],
    },
  };
};