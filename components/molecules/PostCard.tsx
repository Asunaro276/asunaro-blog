import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Blog } from "types"
import { Link } from '@mui/material';
import { convertDateFormat } from 'libs/convertDateFormat';


type Props = {
  blog: Blog
}

export default function PostCard(props: Props) {
  return (
    <Card className='max-w-sm min-w-min'>
      <Link href={`blog/${props.blog.id}`} underline="none">
        <CardMedia
          component="img"
          alt={props.blog.imageAlt}
          image={props.blog.image.url}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className='ml-5'>
          <Link href={`blog/${props.blog.id}`} color="inherit" underline='hover'>
            {props.blog.title}
          </Link>
        </Typography>
        <Typography variant="body1" color="text.secondary" className='ml-5'>
          {props.blog.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" className='ml-5 mt-5'>
          {convertDateFormat(props.blog.publishedAt)}
        </Typography>
      </CardContent>
      <CardActions className='justify-center'>
        <Link href={`blog/${props.blog.id}`} color="inherit" underline='none'>
          <Button size="small" variant="outlined" color="inherit">Read More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}