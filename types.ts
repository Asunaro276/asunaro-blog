export type Blog = {
  id: string
  title: string
  description: string
  body: string
  publishedAt: string
  image: {
    url: string
    width: number
    height: number
  }
  imageAlt: string
}
