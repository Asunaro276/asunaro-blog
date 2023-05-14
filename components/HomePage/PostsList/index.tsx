import { Article } from "types"
import { Box } from "@mui/material"
import PostCard from "./PostCard"

type Props = {
  blogs: Article[]
}

const PostsList = (props: Props) => {
  return (
    <Box className="flex flex-wrap">
      {props.blogs.map((post, index) => {
        return (
        <Box
          key={index}
          sx={{ marginRight: { sm: index % 2 === 0 ? "3%" : "0", xs: "3%" },
                width: { xs: "100%", sm: "48%" } }}
          className="mb-8"
        >
          <PostCard
            blog={post}        
          />
        </Box>
        )
      })}
    </Box>
  )
}

export default PostsList
