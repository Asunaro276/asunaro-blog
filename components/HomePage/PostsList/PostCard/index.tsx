import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, Link as MuiLink } from '@mui/material'
import { convertDateFormat } from 'libs/convertDateFormat'
import NextLink from 'next/link'
import { LocalOffer } from '@mui/icons-material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { ArticleResponse } from 'types'

type Props = {
  blog: ArticleResponse
}

export default function PostCard(props: Props) {
  return (
    <Card
      className='flex flex-col hover:brightness-[0.8] duration-[1000ms]'
      sx={{ height: { xs: '30rem', lg: '32rem' } }}
    >
      <NextLink href={`/blog/${props.blog._id}`} passHref>
        <CardActionArea className='relative h-full'>
          <CardMedia
            component='img'
            height='200'
            image={props.blog.coverImage.src}
            alt={props.blog.coverImage.altText}
          />
          {/* <Image src={props.blog.coverImage.src} alt={props.blog.coverImage.altText} width="550" height="300" objectFit='fill' /> */}
          <CardContent className='h-1/2 p-1 mt-2'>
            <Typography gutterBottom component='div' className='mx-5' sx={{ fontSize: 20 }}>
              <Typography className='text-black text-lg'>{props.blog.title}</Typography>
              <Box
                className=''
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
              >
                <Button
                  className='my-2 text-xs'
                  variant='outlined'
                  sx={{ textTransform: 'none', display: 'flex' }}
                  size='small'
                >
                  {props.blog.category.displayedName}
                </Button>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {props.blog.tags.map((tag, index) => (
                    <Box sx={{ display: 'flex', marginRight: '0.5em' }} key={index}>
                      <LocalOffer sx={{ fontSize: '1.25rem', marginRight: '0.05rem' }} />
                      <Typography sx={{ display: 'inline-block' }}>{tag.tag}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Typography>
          </CardContent>
          <CardContent className='p-1 pl-5 flex opacity-80 absolute bottom-2'>
            <AccessTimeIcon fontSize='small' className='opacity-80' />
            <Typography color='text.secondary' sx={{ display: 'inline-block', marginLeft: '2px' }}>
              {convertDateFormat(props.blog._sys.updatedAt)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  )
}
