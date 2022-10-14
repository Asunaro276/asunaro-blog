export type Blog = {
  id: string
  title: string
  description: string
  body: BlogBody
  category: Category
  publishedAt: string
  image: Image
  imageAlt: string
}

export type ParsedBlog = {
  id: string
  title: string
  description: string
  body: string
  category: Category
  publishedAt: string
  image: Image
  imageAlt: string
}

export type BlogBody = (Paragraph | Link | Code)[]

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

export type Image = {
  url: string
  width: number
  height: number
}

export type Category = {
  id: string
  name: string
  displayedName: string
}

export type Heading = {
  text: string
  tag: string
  id: string
}
