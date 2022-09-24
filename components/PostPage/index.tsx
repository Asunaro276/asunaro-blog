import { Blog, Category } from "types";
import Box from "@mui/material/Box"
import { linkTo, pages } from "pages";
import { parsePostHeading } from "libs/parsePostHeading";
import Header from "components/common/Header";
import PostBody from "./PostBody";
import Footer from "components/common/Footer";
import SideBar from "components/common/SideBar";

type Props = {
  blog: Blog
  content: string
  categories: Category[]
}

const PostPage = (props: Props) => {
  const linkToId = ["/"].concat([...props.categories].filter((category) => linkTo.includes(category.name)).map((category) => `/blog/category/${category.id}`))
  const heading = parsePostHeading(props.blog.body)
  return (
    <div className="bg-slate-100">
      <div>
        <Header
          linkToId={linkToId}
        />
      </div>
      <div className="flex flex-row justify-between">
        <Box className="" sx={{ marginX: "2%", width: { xs: "95%", md: "75%" } }}>
          <PostBody
            blog={props.blog}
            content={props.content}
            heading={heading}
          />
        </Box>
        <Box className="mt-32 w-3/12" sx={{ marginX: "2%", display: { xs: "none", md: "block" }}}>
          <SideBar
            heading={heading}
          />
        </Box>
      </div>
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
