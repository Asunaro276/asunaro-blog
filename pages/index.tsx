// pages/index.js
import Link from "next/link";
import { client } from "../libs/client";
import { Blog } from "../types";

type Props = {
  blogs: Blog[]
}


export default function Home(props: Props) {
  return (
    <div>
      <ul>
        {props.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`./blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  console.log(data)

  return {
    props: {
      blogs: data.contents,
    },
  };
};