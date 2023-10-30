import { Box, Container, Grid, Typography } from '@mui/material'
import Footer from 'components/common/Footer'
import Header from 'components/common/Header'
import SideBar from 'components/common/SideBar'
import { ArticleItem, CategoryItem, TagItem } from 'types'
import Pagination from './Pagination'
import PostsList from './PostsList'
import Error from 'next/error'

type Props = {
  pageNumber: number
  blogs: ArticleItem[]
  categories: CategoryItem[]
  tags: TagItem[]
  years: { [key: number]: number }
  totalCount: number
  category?: CategoryItem
  tag?: TagItem
  year?: number
  statusCode?: number
}

const HomePage = (props: Props) => {
  const dir = (() => {
    if (props.tag) {
      return `tag/${props.tag._id}`
    } else if (props.category) {
      return `category/${props.category._id}`
    } else if (props.year) {
      return `year/${props.year}`
    } else {
      return ''
    }
  })()
  return (
    <Box className='bg-slate-100'>
      <Box>
        <Header categories={props.categories} />
      </Box>
      <Container maxWidth='lg' sx={{ paddingY: '2rem' }}>
        <Grid container columnSpacing={4} rowSpacing={6}>
          <Grid container item md={9}>
            <Grid item xs={12}>
              {props.tag && (
                <Box className='my-12 text-center'>
                  {props.blogs.length === 0 ? (
                    <Typography className=''>該当するタグの記事はありません</Typography>
                  ) : (
                    <Typography>{props.tag.tag}に関する記事一覧</Typography>
                  )}
                </Box>
              )}
              {props.category && (
                <Box className='my-12 text-center'>
                  {props.blogs.length === 0 ? (
                    <Typography className=''>該当するカテゴリーの記事はありません</Typography>
                  ) : (
                    <Typography>
                      {props.blogs[0].category.displayedName}カテゴリの記事一覧
                    </Typography>
                  )}
                </Box>
              )}
              {props.year && (
                <Box className='my-12 text-center'>
                  {props.blogs.length === 0 ? (
                    <Typography className=''>該当する年の記事はありません</Typography>
                  ) : (
                    <Typography>{props.year}年の記事一覧</Typography>
                  )}
                </Box>
              )}
              {props.statusCode && (
                <Error statusCode={props.statusCode as number} />
              )}
              {!props.statusCode &&
                <PostsList blogs={props.blogs} />
              }
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <SideBar years={props.years} tags={props.tags} />
          </Grid>
          {!props.statusCode && (
            <Grid item container md={9} justifyContent='center'>
              <Pagination dir={dir} pageNumber={props.pageNumber} totalCount={props.totalCount} />
            </Grid>
          )}
        </Grid>
      </Container>
      <div>
        <Footer categories={props.categories} />
      </div>
    </Box>
  )
}

export default HomePage
