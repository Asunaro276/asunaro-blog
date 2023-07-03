export type ArticleResponse = {
  _id: BlogId;
  _sys: Sys;
  title: string;
  description: string;
  coverImage: CoverImage;
  category: CategoryResponse;
  tags: TagResponse[];
  body: string;
};

export type TagResponse = {
  _id: TagId;
  _sys: Sys;
  tag: string;
  tagTotalCount?: number;
};

export type CategoryResponse = {
  _id: CategoryId;
  _sys?: Sys;
  displayedName: string;
  name: string;
};

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
  title: string;
  description: string;
  image: string;
  [key: string]: string;
};

export type Year = number

export type TagId = string

export type CategoryId = string

export type BlogId = string

export type Page = number
