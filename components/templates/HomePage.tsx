import { Box } from "@mui/material";
import PaginationButton from "components/organisms/PaginationButton";
import { Footer } from "components/organisms/Footer";
import Header from "components/organisms/Header"
import PostsList from "components/organisms/PostsList"
import SideBar from "components/organisms/SideBar"
import { linkTo, pages } from "pages";
import { Blog, Category } from "types";

type Props = {
  pageNumber: number
  blogs: Blog[]
  categories: Category[]
  totalCount: number
}

const HomePage = (props: Props) => {
  const linkToId = ["/"].concat([...props.categories].filter((category) => linkTo.includes(category.name)).map((category) => `/blog/category/${category.id}`))
  return (
    <div className="bg-slate-100">
      <div>
        <Header
          linkToId={linkToId}
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
            <PaginationButton pageNumber={props.pageNumber} totalCount={props.totalCount} />
          </Box>
        </Box>
        <Box className="" sx={{ marginTop: { xs: "30px", md: "40px"}, marginX: "3%", width: { xs: "90%", md: "25%" } }}>
          <SideBar />
        </Box>
      </Box>
      <div>
        <Footer
          pages={pages}
          linkTo={linkToId}
        />
      </div>
    </div>
  )
}

export default HomePage
