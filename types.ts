export type Article = {
  title: string;
  description: string;
  coverImage: CoverImage;
  category: CategoryResponse;
  tags: TagResponse[];
  body: string;
};

export type ArticleResponse = NewtItems<Article>

export type Tag = {
  tag: string;
  totalCount?: number;
};

export type TagResponse = NewtItems<Tag>

export type Category = {
  displayedName: string;
  name: string;
};

export type CategoryResponse = NewtItems<Category>

export type CoverImage = {
  _id: string;
  altText: string;
  description: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  height: number;
  metadata: object;
  src: string;
  title: string;
  width: number;
};

export type Sys = {
  raw: {
    createdAt: string;
    updatedAt: string;
    firstPublishedAt: string;
    publishedAt: string;
  };
  customOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type Heading = {
  text: string;
  htmlTag: string;
  _id: string;
};

export type OGP = {
  title: string
  description: string
  image: string
  [key: string]: string
}

export type NewtResponse<T> = {
  skip: number,
  limit: number,
  total: number,
  items: T[]
}

export type NewtItems<T> = {
  _id: string,
  _sys: Sys,
} & T

export type Years = {
  [key: string]: number;
};

export type Year = number;

export type TagId = string;

export type CategoryId = string;

export type BlogId = string;

export type Page = number;
