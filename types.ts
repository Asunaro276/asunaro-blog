export type Blog = {
  id: string
  title: string
  description: string
  body: BlogBody
  category: Category
  tags: Tag[]
  publishedAt: string
  image: Image
  imageAlt?: string
}

export type ParsedBlog = {
  id: string
  title: string
  description: string
  body: string
  category: Category
  tags: Tag[]
  publishedAt: string
  image: Image
  imageAlt?: string
}

export type BlogBody = (Paragraph | Link | Code | Math)[]

export type Paragraph = {
  fieldId: string
  paragraph: string
}

export type Link = {
  fieldId: string
  url: string
  title: string
  image: Image
  linkTo?: string
}

export type Code = {
  fieldId: string
  code: string
  fileName: string
}

export type Math = {
  fieldId: string
  formula: string
}

export type Image = {
  url: string
  width: number
  height: number
}

export type Tag = {
  id: string
  tag: string
  tagTotalCount?: number
}

export type Category = {
  id: string
  name: string
  displayedName: string
}

export type Heading = {
  text: string
  htmlTag: string
  id: string
}

export type OGP = {
  title: string
  description: string
  image: string
  [key: string]: string
}