import { ArticleResponse } from "types"
import { Box } from "@mui/material"
import PostCard from "./PostCard"

type Props = {
  blogs: ArticleResponse[]
}

const PostsList = (props: Props) => {
  return (
    <Box className="flex flex-wrap">
      {props.blogs.map((post, index) => {
        return (
        <Box
          key={index}
          sx={{ marginRight: { xs: "0px", sm: index % 2 === 0 ? "4%" : "0" },
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
