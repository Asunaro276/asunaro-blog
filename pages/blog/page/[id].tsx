import { PER_PAGE } from 'components/HomePage/elements/PaginationButton';
import HomePage from 'components/HomePage/HomePage';
import { client } from 'libs/client';
import { GetStaticProps } from 'next';
import { Blog, Category } from 'types';

type Props = {
  pageNumber: number
  blogs: Blog[]
  categories: Category[]
  totalCount: number
}

type Params = {
  id: string
}


// pages/blog/[id].js
export default function BlogPageId(props: Props) {
  return (
    <main>
      <HomePage
        pageNumber={props.pageNumber}
        blogs={props.blogs}
        categories={props.categories}
        totalCount={props.totalCount}
      />
    </main>
  )
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);
  return { paths, fallback: false };
};

// データを取得
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const pageNumber = Number(context.params!.id)

  const data = await client.get({ endpoint: "blog", queries: { offset: (pageNumber - 1) * PER_PAGE, limit: PER_PAGE } });
  const categoryData = await client.get({ endpoint: "categories" })

  return {
    props: {
      pageNumber: pageNumber,
      blogs: data.contents,
      categories: categoryData.contents,
      totalCount: data.totalCount,
    },
  };
};