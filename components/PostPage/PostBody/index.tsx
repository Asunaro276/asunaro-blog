import { Box, Card } from '@mui/material'
import { ArticleItem, Heading } from 'types'
import Caption from './Caption'
import { TableOfContents } from './TableOfContents'
import { useEffect } from 'react'
import renderMathInElement from 'katex/contrib/auto-render'
import 'katex/dist/katex.min.css'
import { useCodeCopy } from '/hooks/useCodeCopy'

type Props = {
  blog: ArticleItem
  headings: Heading[]
}

const PostBody = (props: Props) => {
  useCodeCopy()
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
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TableOfContents heading={props.headings} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box className='mb-20' sx={{ width: { xs: '90%', sm: '80%' }}}>
          <div dangerouslySetInnerHTML={{ __html: props.blog.body }} />
        </Box>
      </Box>
    </Card>
  )
}

export default PostBody
