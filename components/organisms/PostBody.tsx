import { Box, Card } from "@mui/material"
import { TableOfContents } from "components/molecules/TableOfContents"
import { Blog } from "types"
import Caption from "../molecules/Caption"

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
    <Box className="flex justify-center">
      <TableOfContents
        parsedBody={props.heading}
      />
    </Box>
    <Box className="flex justify-center">
      <Box className="w-10/12">
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
      </Box>
    </Box>
  </Card>
  )
}

export default PostBody
