export type Article = {
  _id: string
  _sys: Sys
  title: string
  description: string
  coverImage: CoverImage
  category: Category
  tags: Tag[]
  body: string
}

export type Tag = {
  _id: string
  _sys: Sys
  tag: string
  tagTotalCount?: number
}

export type Category = {
  _id: string
  _sys?: Sys
  displayedName: string
  name: string
}

export type CoverImage = {
  _id: string
  altText: string
  description: string
  fileName: string
  fileSize: number
  fileType: string
  height: number
  metadata: object
  src: string
  title: string
  width: number
}

export type Sys = {
  raw: {
    createdAt: string
    updatedAt: string
    firstPublishedAt: string
    publishedAt: string
  }
  customOrder: number
  createdAt: string
  updatedAt: string
}

export type Heading = {
  text: string
  htmlTag: string
  _id: string
}

export type OGP = {
  title: string
  description: string
  image: string
  [key: string]: string
}