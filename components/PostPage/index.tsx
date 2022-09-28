import { Blog, Category, ParsedBlog } from "types";
import Box from "@mui/material/Box"
import { linkTo, pages } from "pages";
import Header from "components/common/Header";
import PostBody from "./PostBody";
import Footer from "components/common/Footer";
import SideBar from "components/common/SideBar";
import { parsePostBody, parsePostHeading } from "libs/parse/parsePostHeading";

type Props = {
  blog: ParsedBlog
  categories: Category[]
}

const PostPage = (props: Props) => {
  const linkToId = ["/"].concat([...props.categories].filter((category) => linkTo.includes(category.name)).map((category) => `/blog/category/${category.id}`))
  const headings = parsePostHeading(props.blog.body)
  return (
    <div className="bg-slate-100">
      <div>
        <Header
          linkToId={linkToId}
        />
      </div>
      <Box className="flex justify-between" sx={{ flexDirection: {xs: "column", md: "row"} }}>
        <Box className="" sx={{ marginX: "2%", width: { xs: "95%", md: "75%" } }}>
          <PostBody
            blog={props.blog}
            headings={headings}
          />
        </Box>
        <Box className="mt-32" sx={{ marginX: "2%", width: { md: "25%" } }}>
          <SideBar
            headings={headings}
          />
        </Box>
      </Box>
      <div>
        <Footer
          pages={pages}
          linkTo={linkTo}
        />
      </div>
    </div>
  )
}

export default PostPage
