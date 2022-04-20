import Header from "components/organisms/Header"
import PostsList from "components/organisms/PostsList"
import { Blog } from "types";

type Props = {
  blogs: Blog[]
}

const HomePage = (props: Props) => {
  return (
    <div className="bg-slate-100">
      <div>
        <Header />
      </div>
      <div>
        <PostsList
          blogs={props.blogs}
        />
      </div>
    </div>
  )
}

export default HomePage
