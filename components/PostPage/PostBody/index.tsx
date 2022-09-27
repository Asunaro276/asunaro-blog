import { Box, Card } from "@mui/material"
import { parsePostBody } from "libs/parsePostBody";
import { Blog, Heading, ParsedBlog } from "types"
import Caption from "./Caption"
import { TableOfContents } from "./TableOfContents";

type Props = {
  blog: ParsedBlog
  headings: Heading[]
}

const PostBody = (props: Props) => {
  return (
  <Card className="my-10">
    <Box className="my-10">
      <Caption
        title={props.blog.title}
        publishedAt={props.blog.publishedAt}
        imageUrl={props.blog.image.url}
        imageAlt={props.blog.imageAlt}
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
