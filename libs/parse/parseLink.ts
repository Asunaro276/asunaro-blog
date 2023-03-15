import cheerio from "cheerio"
import { OGP } from "types"


export const parseLink = async (linkUrl: string, imageUrl: string, title: string) => {
  let og: { [key: string]: string } = {}
  const res = await fetch(linkUrl)
  const text = await res.text()
  const $ = cheerio.load(text)
  $('meta[property^="og"]').each((_, element) => {
    og[$(element).attr("property")?.replace("og:", "") as string] = ($(element).attr("content") as string)
  })
  $('meta[name]').each((_, element) => {
    if (og[$(element).attr("name") as string] === undefined) {
      og[$(element).attr("name") as string] = ($(element).attr("content") as string)
    }
  })
  return String.raw`
  <div class="shadow-md shadow-outline bg-slate-50 mt-4 mb-20 hover:brightness-[0.9] duration-300 ease-out">
    <a class="p-4 no-underline" href=${linkUrl} target="_blank" rel="noopener noreferrer">
      <div class="flex justify-evenly flex-wrap">
        <img src=${og["image"] === undefined ? imageUrl : og["image"]} class="max-w-[14rem] mr-2" />
        <div class="flex flex-col w-7/12 justify-center items-center">
          <p class="text-xl font-bold my-3">
            ${og["title"]}
          </p> 
          <p class="text-black my-1">
            ${og["description"]}
          </p>
        </div>
      </div>
    </a>
  </div>
  `
}