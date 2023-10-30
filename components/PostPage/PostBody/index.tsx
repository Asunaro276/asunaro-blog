import { Box, Card } from '@mui/material'
import { ArticleItem, Heading } from 'types'
import Caption from './Caption'
import { TableOfContents } from './TableOfContents'
import { useEffect } from 'react'
import renderMathInElement from 'katex/contrib/auto-render'
import 'katex/dist/katex.min.css'

type Props = {
  blog: ArticleItem
  headings: Heading[]
}

const PostBody = (props: Props) => {
  useEffect(() => {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '[', right: ']', display: true },
      ],
      ignoredTags: ['code'],
      throwOnError: false,
      strict: false,
    })
  }, [])
  return (
    <Card className='my-10'>
      <Box className='my-10'>
        <Caption
          title={props.blog.title}
          publishedAt={props.blog._sys.raw.firstPublishedAt}
          tagsOfPost={props.blog.tags}
          categoryOfPost={props.blog.category}
          imageUrl={props.blog.coverImage.src}
          imageAlt={
            props.blog.coverImage.altText === undefined ? '' : props.blog.coverImage.altText
          }
        />
      </Box>
      <Box className='mb-20 flex justify-center'>
        <TableOfContents heading={props.headings} />
      </Box>
      <Box className='flex justify-center'>
        <Box className='mb-20 w-10/12'>
          <div dangerouslySetInnerHTML={{ __html: props.blog.body }} />
        </Box>
      </Box>
    </Card>
  )
}

export default PostBody
