import { Box, Typography } from "@mui/material";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import SideBar from "components/common/SideBar";
import { linkTo, pages } from "pages";
import { Blog, Category } from "types";
import PostsList from "../elements/PostsList";

type Props = {
  blogs: Blog[]
  categories: Category[]
  categoryName: string
}

const CategoryPage = (props: Props) => {
  const linkToId = ["/"].concat([...props.categories].filter((category) => linkTo.includes(category.name)).map((category) => `/blog/category/${category.id}`))
  return (
    <div className="bg-slate-100">
      <div>
        <Header
          linkToId={linkToId}
        />
      </div>
      <div className="flex flex-row justify-between">
        <Box className="mt-10" sx={{ width: { xs: "100%", md: "75%" }}}>
          <Box className="text-center my-12">
            {props.blogs.length === 0
            ? (<Typography className="">
                該当するカテゴリーの記事はありません
              </Typography>)
              : (<Typography>
                  {pages[linkTo.indexOf(props.categoryName)]}カテゴリの記事一覧
                </Typography>)
            }
          </Box>
          <PostsList
            blogs={props.blogs}
          />
        </Box>
        <Box className="mt-32 w-3/12" sx={{ marginX: "3%", display: { xs: "none", md: "block" }}}>
          <SideBar />
        </Box>
      </div>
      <div>
        <Footer
          pages={pages}
          linkTo={linkToId}
        />
      </div>
    </div>
  )
}

export default CategoryPage
