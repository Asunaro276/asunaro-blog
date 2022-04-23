import { Box, Card } from "@mui/material"
import { RenderedElement } from "components/molecules/RenderedElement"
import { TableOfContents } from "components/molecules/TableOfContents"
import { Blog } from "types"
import Caption from "../molecules/Caption"

type Props = {
  blog: Blog
  parsedBody: { text: string
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
        parsedBody={props.parsedBody}
      />
    </Box>
    <Box className="flex justify-center">
      <Box className="w-10/12">
        {props.parsedBody.map((textParts) => (
          <RenderedElement
            id={textParts.id}
            text={textParts.text}
            tag={textParts.tag}
          />
        ))}
      </Box>
    </Box>
  </Card>
  )
}

export default PostBody
