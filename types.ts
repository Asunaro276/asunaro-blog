export type Blog = {
  id: string
  title: string
  description: string
  body: string
  category: {
    id: string
    name: string
  }
  publishedAt: string
  image: {
    url: string
    width: number
    height: number
  }
  imageAlt: string
}

export type Category = {
  id: string
  name: string
}

export type MetaData = {
  url: string,
  title: string,
  description: string,
  image: string,
}