import { Box, Typography } from "@mui/material";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import SideBar from "components/common/SideBar";
import { Blog, Category, Tag } from "types";
import Pagination from "../elements/Pagination";
import PostsList from "../elements/PostsList";

type Props = {
  pageNumber: number
  totalCount: number
  blogs: Blog[]
  categories: Category[]
  tags: Tag[]
  tag: Tag
}

const TagPage = (props: Props) => {
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
                該当するタグの記事はありません
              </Typography>)
              : (<Typography>
                  {props.tag.tag}に関する記事一覧
                </Typography>)
            }
          </Box>
          <PostsList
            blogs={props.blogs}
          />
          <Box className="flex justify-center mb-10">
            <Pagination dir={`/tag/${props.tag.id}`} pageNumber={props.pageNumber} totalCount={props.totalCount} />
          </Box>
        </Box>
        <Box className="mt-32 w-3/12" sx={{ marginX: "3%", display: { xs: "none", md: "block" }}}>
          <SideBar tags={props.tags} />
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

export default TagPage
