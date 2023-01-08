import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Blog } from "types"
import { Box, Link as MuiLink } from '@mui/material';
import { convertDateFormat } from 'libs/convertDateFormat';
import Image from 'next/image';
import NextLink from 'next/link';
import { LocalOffer } from '@mui/icons-material';

type Props = {
  blog: Blog
}

export default function PostCard(props: Props) {
  return (
    <Card className='flex flex-col' sx={{ height: {sm: "27rem", lg: "30rem"} }}>
      <NextLink href={`/blog/${props.blog.id}`} passHref>
        <MuiLink underline="none" className='h-1/2'>
          <CardMedia
            className="hover:brightness-[0.7] duration-[300ms]"
            sx={{ height: "100%" }}
          >
            <Image src={props.blog.image.url} alt={props.blog.imageAlt} width="550" height="300" objectFit='fill' />
          </CardMedia>
        </MuiLink>
      </NextLink>
      <CardContent className='h-1/2 p-1' >
        <Typography gutterBottom component="div" className='mx-5' sx={{ fontSize: 20 }}>
          <NextLink href={`/blog/${props.blog.id}`} passHref>
            <MuiLink color="inherit" underline='hover' className=''>
              {props.blog.title}
            </MuiLink>
          </NextLink>
          <Box className="" sx={{ display: "flex", flexDirection: "column",  alignItems: "start" }}>
            <NextLink href={`/category/${props.blog.category.id}`} passHref>
              <Button className="my-1.5 text-xs" variant="outlined" sx={{ textTransform: "none", display: "flex" }} size="small">
                {props.blog.category.displayedName}
              </Button>
            </NextLink>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {props.blog.tags.map(tag => (
                <NextLink href={`/tag/${tag.id}`} key={tag.id} passHref>
                  <MuiLink className='mr-1' sx={{ textTransform: "none", display: "flex", fontSize: "0.8rem" }}>
                    <LocalOffer sx={{ fontSize: "1.2rem", marginRight: "0.05rem" }} />
                    {tag.tag}
                  </MuiLink>
                </NextLink>
              ))}
            </Box>
          </Box>
        </Typography>
        {/* <Typography variant="body1" color="text.secondary" className='ml-5 text-ellipsis overflow-y-hidden'>
          {props.blog.description}
        </Typography> */}
      </CardContent>
      <CardContent className="p-1">
        <Typography variant="body2" color="text.secondary" className='ml-5'>
          {convertDateFormat(props.blog.publishedAt)}
        </Typography>
      </CardContent>
      <CardActions className='justify-center p-1'>
        <NextLink href={`/blog/${props.blog.id}`} passHref>
          <MuiLink color="inherit" underline='none'>
            <Button size="small" variant="outlined" color="inherit">Read More</Button>
          </MuiLink>
        </NextLink>
      </CardActions>
    </Card>
  );
}