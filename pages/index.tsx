import { ArticleItem, CategoryItem, TagItem, YearMonthItem } from 'types'
import CodeIcon from '@mui/icons-material/Code'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import BusinessIcon from '@mui/icons-material/Business'
import FunctionsIcon from '@mui/icons-material/Functions'
import HomePage from 'components/HomePage'
import { NextSeo } from 'next-seo'
import { fetchBlogData } from 'libs/fetch/fetchBlogData'

type Props = {
  blogs: ArticleItem[]
  categories: CategoryItem[]
  tags: TagItem[]
  yearmonths: YearMonthItem[]
  totalCount: number
}

export const PER_PAGE = 10

export const pageIcons = [
  <HomeOutlinedIcon key={0} />,
  <CodeIcon key={1} />,
  <BusinessIcon key={2} />,
  <FunctionsIcon key={3} />,
  <MoreHorizIcon key={4} />,
]

export default function Home(props: Props) {
  return (
    <main>
      <NextSeo title='asunaroblog｜Web技術で遊ぶブログ' titleTemplate='%s' />
      <HomePage
        pageNumber={1}
        blogs={props.blogs}
        categories={props.categories}
        tags={props.tags}
        yearmonths={props.yearmonths}
        totalCount={props.totalCount}
      />
    </main>
  )
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const { blogs, categories, tags, yearmonths, totalCount } = await fetchBlogData({ pageNumber: 1 })
  return {
    props: {
      blogs,
      categories,
      tags,
      yearmonths,
      totalCount,
    },
  }
}
