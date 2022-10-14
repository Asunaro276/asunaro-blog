import { Box, Typography } from "@mui/material";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import SideBar from "components/common/SideBar";
import { Blog, Category } from "types";
import PostsList from "../elements/PostsList";

type Props = {
  blogs: Blog[]
  categories: Category[]
  categoryName: string
}

const CategoryPage = (props: Props) => {
  return (
    <div className="bg-slate-100">
      <div>
        <Header
          categories={props.categories}
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
                  {props.categories.filter((category) => category.name === props.categoryName)[0].displayedName}カテゴリの記事一覧
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
          categories={props.categories}
        />
      </div>
    </div>
  )
}

export default CategoryPage
