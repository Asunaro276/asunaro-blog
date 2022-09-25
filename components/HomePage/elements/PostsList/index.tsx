import { Blog } from "types"
import { Box } from "@mui/material"
import PostCard from "./PostCard"

type Props = {
  blogs: Blog[]
}

const PostsList = (props: Props) => {
  return (
    <Box className="flex flex-wrap" sx={{ marginLeft: "2%"}}>
      {props.blogs.map((post, index) => {
        return (
        <Box key={index} sx={{ marginRight: "2%", width: { xs: "100%", sm: "48%" } }} className="mb-8">
          <PostCard
            blog={{
                id: post.id,
                title: post.title,
                description: post.description,
                body: post.body,
                category: post.category,
                publishedAt: post.publishedAt,
                image: post.image,
                imageAlt: post.imageAlt,
            }}            
          />
        </Box>
        )
      })}
    </Box>
  )
}

export default PostsList
