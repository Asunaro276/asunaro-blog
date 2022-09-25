import { Box, Card } from "@mui/material"
import { parsePostBody } from "libs/parsePostBody";
import { Blog, Heading } from "types"
import Caption from "./Caption"
import { ParsedBody } from "./ParsedBody";
import { TableOfContents } from "./TableOfContents";

type Props = {
  blog: Blog
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
      <TableOfContents heading={parsePostBody(props.blog.body)} />
    </Box>
    <Box className="flex justify-center">
      <Box className="w-10/12 mb-20">
        <ParsedBody body={props.blog.body} />
      </Box>
    </Box>
  </Card>
  )
}

export default PostBody
