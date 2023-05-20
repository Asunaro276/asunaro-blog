import { Article, Category, Heading, Tag } from "types";
import Box from "@mui/material/Box"
import Header from "components/common/Header";
import PostBody from "./PostBody";
import Footer from "components/common/Footer";
import SideBar from "components/common/SideBar";

type Props = {
  blog: Article
  headings: Heading[]
  categories: Category[]
  tags: Tag[]
  years: { [key: number]: number }
}

const PostPage = (props: Props) => {
  return (
    <div className="bg-slate-100">
      <div>
        <Header
          categories={props.categories}
        />
      </div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box className="flex justify-between" sx={{ maxWidth: "1300px", width: "95%", flexDirection: {xs: "column", md: "row"} }}>
          <Box className="" sx={{ width: { xs: "100%", md: "70%" } }}>
            <PostBody
              blog={props.blog}
              headings={props.headings}
            />
          </Box>
          <Box sx={{ marginTop: "2.5rem", marginX: "2%", width: { md: "30%" } }}>
            <SideBar
              tags={props.tags}
              years={props.years}
              headings={props.headings}
            />
          </Box>
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
