import { Box, Button, CardMedia, Link as MuiLink, Typography } from '@mui/material'
import { convertDateFormat } from 'libs/convertDateFormat'
import NextLink from 'next/link'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { CategoryItem, TagItem } from 'types'

type Props = {
  title: string
  publishedAt: string
  tagsOfPost: TagItem[]
  categoryOfPost: CategoryItem
  imageUrl: string
  imageAlt: string
}

const Caption = (props: Props) => {
  return (
    <Box>
      <Box className='mb-10 flex justify-center'>
        <Typography color='text.secondary' variant='caption'>
          {convertDateFormat(props.publishedAt)}
        </Typography>
      </Box>
      <Box className='mt-10 mb-4 flex justify-center'>
        <Typography className='font-title font-bold text-slate-600' sx={{ width: { xs: '90%', sm: '80%' }, fontSize: { xs: '20px', sm: '24px' }}}>
          {props.title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: { xs: '90%', sm: '80%' }}}>
          <Box
            className='mb-10 space-y-2'
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <NextLink href={`/category/${props.categoryOfPost._id}`} passHref>
              <Button
                className='mr-2'
                variant='outlined'
                sx={{ textTransform: 'none', display: 'flex' }}
                size='small'
              >
                {props.categoryOfPost.displayedName}
              </Button>
            </NextLink>
            {props.tagsOfPost.map((tag) => (
              <NextLink href={`/tag/${tag._id}`} key={tag._id} passHref>
                <MuiLink className='mr-2 text-sm' sx={{ textTransform: 'none', display: 'flex' }}>
                  <LocalOfferIcon fontSize='small' />
                  {tag.tag}
                </MuiLink>
              </NextLink>
            ))}
          </Box>
          <CardMedia component='img' width='80%' image={props.imageUrl} alt={props.imageAlt} />
        </Box>
      </Box>
    </Box>
  )
}

export default Caption
