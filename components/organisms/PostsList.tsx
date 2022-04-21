import { Blog } from "types"
import PostCard from "../molecules/PostCard"

type Props = {
  blogs: Blog[]
}

const PostsList = (props: Props) => {
  return (
    <div className="flex flex-wrap">
      {props.blogs.map((post, index) => {
        return (
        <div key={index} className="my-10 mr-10">
          <PostCard 
            blog={{
                id: post.id,
                title: post.title,
                description: post.description,
                body: post.body,
                publishedAt: post.publishedAt,
                image: post.image,
                imageAlt: post.imageAlt,
            }}            
          />
        </div>
        )
      })}
    </div>
  )
}

export default PostsList
