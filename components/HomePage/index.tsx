import { Box, Typography } from "@mui/material";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import SideBar from "components/common/SideBar";
import { Article, Category, Tag } from "types";
import Pagination from "./Pagination";
import PostsList from "./PostsList";

type Props = {
  pageNumber: number
  blogs: Article[]
  categories: Category[]
  tags: Tag[]
  years: { [key: number]: number }
  totalCount: number
  category?: Category
  tag?: Tag
  year?: number
}

const HomePage = (props: Props) => {
  let dir = ""
  if (props.tag) {
    dir = `tag/${props.tag._id}`
  } else if (props.category) {
    dir = `category/${props.category._id}`
  } else if (props.year) {
    dir = `year/${props.year}`
  } else {
    dir = ""
  }
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
            {props.tag &&
            (<Box className="text-center my-12">
              {props.blogs.length === 0
              ? (<Typography className="">
                  該当するタグの記事はありません
                </Typography>)
                : (<Typography>
                    {props.tag.tag}に関する記事一覧
                  </Typography>)
              }
            </Box>)}
            {props.category &&
            (<Box className="text-center my-12">
              {props.blogs.length === 0
              ? (<Typography className="">
                  該当するカテゴリーの記事はありません
                </Typography>)
                : (<Typography>
                    {props.blogs[0].category.displayedName}カテゴリの記事一覧
                  </Typography>)
              }
            </Box>)}
            {props.year &&
            (<Box className="text-center my-12">
              {props.blogs.length === 0
              ? (<Typography className="">
                  該当する年の記事はありません
                </Typography>)
                : (<Typography>
                    {props.year}年の記事一覧
                  </Typography>)
              }
            </Box>)}
            <PostsList
              blogs={props.blogs}
            />
          </Box>
          <Box className="flex justify-center mb-10">
            <Pagination dir={dir} pageNumber={props.pageNumber} totalCount={props.totalCount} />
          </Box>
        </Box>
        <Box className="" sx={{ marginTop: { xs: "30px", md: "40px"}, marginX: "3%", width: { xs: "90%", md: "25%" } }}>
          <SideBar years={props.years} tags={props.tags} />
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
