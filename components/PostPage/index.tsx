import { ArticleItem, CategoryItem, Heading, TagItem, YearMonthItem } from 'types'
import Box from '@mui/material/Box'
import Header from 'components/common/Header'
import PostBody from './PostBody'
import Footer from 'components/common/Footer'
import SideBar from 'components/common/SideBar'

type Props = {
  blog: ArticleItem
  headings: Heading[]
  categories: CategoryItem[]
  tags: TagItem[]
  yearmonths: YearMonthItem[]
}

const PostPage = (props: Props) => {
  return (
    <div className='bg-slate-100'>
      <div>
        <Header categories={props.categories} />
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            maxWidth: '1300px',
            width: '95%',
            flexDirection: { xs: 'column', md: 'row' },
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '75%' } }}>
            <PostBody blog={props.blog} headings={props.headings} />
          </Box>
          <Box sx={{ marginTop: '2.5rem', marginX: '3%', width: { md: '25%' } }}>
            <SideBar tags={props.tags} yearmonths={props.yearmonths} headings={props.headings} />
          </Box>
        </Box>
      </Box>
      <div>
        <Footer categories={props.categories} />
      </div>
    </div>
  )
}

export default PostPage
