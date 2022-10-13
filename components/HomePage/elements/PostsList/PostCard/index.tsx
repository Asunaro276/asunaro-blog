import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Blog } from "types"
import { createStyles, Link, makeStyles } from '@mui/material';
import { convertDateFormat } from 'libs/convertDateFormat';
import Image from 'next/image';

type Props = {
  blog: Blog
}

export default function PostCard(props: Props) {
  return (
    <Card className='flex flex-col h-[27rem]'>
      <Link href={`/blog/${props.blog.id}`} underline="none" className='h-3/5'>
        <CardMedia
          className="hover:brightness-[0.7] duration-[300ms]"
          sx={{ height: "100%" }}
        >
          <Image src={props.blog.image.url} alt={props.blog.imageAlt} width="500" height="280" objectFit='cover' />
        </CardMedia>
      </Link>
      <CardContent className='h-2/5 p-2' >
        <Typography gutterBottom component="div" className='ml-5' sx={{ fontSize: 20 }}>
          <Link href={`/blog/${props.blog.id}`} color="inherit" underline='hover' className=''>
            {props.blog.title}
          </Link>
        </Typography>
        {/* <Typography variant="body1" color="text.secondary" className='ml-5 text-ellipsis overflow-y-hidden'>
          {props.blog.description}
        </Typography> */}
      </CardContent>
      <CardContent className="p-2">
        <Typography variant="body2" color="text.secondary" className='ml-5'>
          {convertDateFormat(props.blog.publishedAt)}
        </Typography>
      </CardContent>
      <CardActions className='justify-center'>
        <Link href={`/blog/${props.blog.id}`} color="inherit" underline='none'>
          <Button size="small" variant="outlined" color="inherit">Read More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}