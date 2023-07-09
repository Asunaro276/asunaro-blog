import { Box, Typography } from "@mui/material";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import SideBar from "components/common/SideBar";
import { ArticleResponse, CategoryResponse, TagResponse } from "types";
import Pagination from "./Pagination";
import PostsList from "./PostsList";
import Error from "next/error";

type Props = {
  pageNumber: number
  blogs: ArticleResponse[]
  categories: CategoryResponse[]
  tags: TagResponse[]
  years: { [key: number]: number }
  totalCount: number
  category?: CategoryResponse
  tag?: TagResponse
  year?: number
  statusCode?: number
}

const HomePage = (props: Props) => {
  const dir = (() => {
    if (props.tag) {
      return `tag/${props.tag._id}`
  } else if (props.category) {
      return `category/${props.category._id}`
  } else if (props.year) {
      return `year/${props.year}`
  } else {
      return ""
  }})()
  console.log(dir)
  return (
    <div className="bg-slate-100">
      <div>
        <Header
          categories={props.categories}
        />
      </div>
      <Box className="flex justify-center">
        <Box sx={{ maxWidth: "1300px", display: "flex", flexDirection: { xs: "column", md: "row" }, }}>
          <Box sx={{ width: { xs: "100%", md: "75%" }, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ marginTop: "40px", width: "95%" }}>
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
              {props.statusCode &&
              (<Box className="text-center my-12" sx={{ height: '100%' }}>
                <Error statusCode={props.statusCode as number} />
              </Box>)}
              <PostsList
                blogs={props.blogs}
              />
            </Box>
            {!(props.statusCode) &&
            <Box className="flex justify-center mb-10">
              <Pagination dir={dir} pageNumber={props.pageNumber} totalCount={props.totalCount} />
            </Box>}
          </Box>
          <Box className="" sx={{ marginTop: { xs: "30px", md: "40px"}, marginX: "3%", width: { xs: "90%", md: "25%" } }}>
            <SideBar years={props.years} tags={props.tags} />
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

export default HomePage
