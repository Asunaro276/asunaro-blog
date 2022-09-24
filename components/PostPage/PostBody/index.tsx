import { Box, Card } from "@mui/material"
import { Blog } from "types"
import parse from 'html-react-parser';
import Caption from "../Caption"
import { TableOfContents } from "../TableOfContents";

type Props = {
  blog: Blog
  content: string
  heading: { text: string
    id: string
    tag: string
  }[]
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
      <TableOfContents
        parsedBody={props.heading}
      />
    </Box>
    <Box className="flex justify-center">
      <Box className="w-10/12 mb-20">
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
        {/* {parse(props.content)} */}
      </Box>
    </Box>
  </Card>
  )
}

export default PostBody
