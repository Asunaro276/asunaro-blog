import { Box, Card } from "@mui/material"
import { TableOfContents } from "components/molecules/TableOfContents"
import { Blog } from "types"
import Caption from "../molecules/Caption"

type Props = {
  blog: Blog
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
        body={props.blog.body}
      />
    </Box>
    <Box>
      <div
        dangerouslySetInnerHTML={{
          __html: `${props.blog.body}`,
        }}
      />
    </Box>
  </Card>
  )
}

export default PostBody
