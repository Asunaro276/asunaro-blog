import { Footer } from "components/organisms/Footer";
import Header from "components/organisms/Header"
import PostBody from "components/organisms/PostBody";
import SideBar from "components/organisms/SideBar"
import { ParsedUrlQuery } from "querystring";
import { Blog } from "types";

type Props = {
  blog: Blog
}

const pages = ["Home", "About"]
const linkTo = ["/", "about"]

const PostPage = (props: Props) => {
  return (
    <div className="bg-slate-100">
      <div>
        <Header
          pages={pages}
          linkTo={linkTo}
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="ml-5 sm:ml-8 lg:ml-10">
        <div>
          <PostBody
            blog={props.blog}
          />
        </div>
        </div>
        <div className="mx-5 sm:mx-8 lg:mx-20x">
          <SideBar />
        </div>
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
