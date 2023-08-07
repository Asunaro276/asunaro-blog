import { Box, Card } from "@mui/material"
import { ArticleResponse, Heading } from "types"
import Caption from "./Caption"
import { TableOfContents } from "./TableOfContents";
import { useEffect } from "react";
import renderMathInElement from "katex/contrib/auto-render";
import 'katex/dist/katex.min.css'

type Props = {
  blog: ArticleResponse
  headings: Heading[]
}

const PostBody = (props: Props) => {
  useEffect(() => {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\[", right: "\]", display: true }
      ],
      ignoredTags: ["code"],
      throwOnError: false,
      strict: false
    })
  }, [])
  return (
  <Card className="my-10">
    <Box className="my-10">
      <Caption
        title={props.blog.title}
        publishedAt={props.blog._sys.raw.firstPublishedAt}
        tagsOfPost={props.blog.tags}
        categoryOfPost={props.blog.category}
        imageUrl={props.blog.coverImage.src}
        imageAlt={
          props.blog.coverImage.altText === undefined
          ? ""
          : props.blog.coverImage.altText
        }
      />
    </Box>
    <Box className="flex justify-center mb-20">
      <TableOfContents heading={props.headings} />
    </Box>
    <Box className="flex justify-center">
      <Box className="w-10/12 mb-20">
        <div dangerouslySetInnerHTML={{ __html: props.blog.body }} />
      </Box>
    </Box>
  </Card>
  )
}

export default PostBody
