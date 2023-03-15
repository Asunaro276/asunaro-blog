import { Category, Heading, ParsedBlog, Tag } from "types";
import Box from "@mui/material/Box"
import Header from "components/common/Header";
import PostBody from "./PostBody";
import Footer from "components/common/Footer";
import SideBar from "components/common/SideBar";

type Props = {
  blog: ParsedBlog
  headings: Heading[]
  categories: Category[]
  tags: Tag[]
}

const PostPage = (props: Props) => {
  return (
    <div className="bg-slate-100">
      <div>
        <Header
          categories={props.categories}
        />
      </div>
      <Box className="flex justify-between" sx={{ flexDirection: {xs: "column", md: "row"} }}>
        <Box className="" sx={{ marginX: "2%", width: { xs: "95%", md: "70%" } }}>
          <PostBody
            blog={props.blog}
            headings={props.headings}
          />
        </Box>
        <Box className="mt-32" sx={{ marginX: "2%", width: { md: "30%" } }}>
          <SideBar
            tags={props.tags}
            headings={props.headings}
          />
        </Box>
      </Box>
      <div>
        <Footer
          categories={props.categories}
        />
      </div>
    </div>
  )
}

export default PostPage
