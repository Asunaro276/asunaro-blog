import { Box } from "@mui/material";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import SideBar from "components/common/SideBar";
import { Blog, Category, Tag } from "types";
import Pagination from "../elements/Pagination";
import PostsList from "../elements/PostsList";

type Props = {
  pageNumber: number
  blogs: Blog[]
  categories: Category[]
  tags: Tag[]
  totalCount: number
}

const HomePage = (props: Props) => {
  return (
    <div className="bg-slate-100">
      <div>
        <Header
          categories={props.categories}
        />
      </div>
      <Box className="flex justify-between" sx={{ flexDirection: { xs: "column", md: "row" }}}>
        <Box className="flex flex-col" sx={{ width: { xs: "100%", md: "75%" }}}>
          <Box className="mt-10">
            <PostsList
              blogs={props.blogs}
            />
          </Box>
          <Box className="flex justify-center mb-10">
            <Pagination dir="" pageNumber={props.pageNumber} totalCount={props.totalCount} />
          </Box>
        </Box>
        <Box className="" sx={{ marginTop: { xs: "30px", md: "40px"}, marginX: "3%", width: { xs: "90%", md: "25%" } }}>
          <SideBar tags={props.tags} />
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

export default HomePage
