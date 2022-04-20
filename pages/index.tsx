// pages/index.js
import HomePage from "components/templates/HomePage";
import { client } from "libs/client";
import { Blog } from "types";

type Props = {
  blogs: Blog[]
}

export default function Home(props: Props) {
  console.log(props.blogs[0].image)
  return (
    <div>
      <HomePage
        blogs={props.blogs}
      />
    </div>
  );
}


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blogs: data.contents,
    },
  };
};
