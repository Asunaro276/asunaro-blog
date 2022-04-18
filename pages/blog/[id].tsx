import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { client } from "../../libs/client";
import { Blog } from "../../types";

type Props = {
  blog: Blog
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function BlogId(props: Props) {
  console.log(props.blog)
  return (
    <main>
      <h1>title: {props.blog.title}</h1>
      <p>published time: {props.blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${props.blog.body}`,
        }}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params!.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
