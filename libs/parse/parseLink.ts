export const parseLink = (linkUrl: string, imageUrl: string, title: string) => {
  const linkBody = String.raw`
  <div class="shadow-md shadow-outline bg-slate-50 my-4 hover:brightness-[0.9] duration-300 ease-out">
    <a class="p-4" href=${linkUrl} target="_blank" rel="noopener noreferrer">
      <div class="flex justify-evenly flex-wrap">
        <img src=${imageUrl} class="max-w-[9rem] mr-2" />
        <div class="flex flex-col w-2/3 justify-center items-center space-y-5">
          <p class="text-lg text-blue-700 underline">
            ${title}
          </p> 
        </div>
      </div>
    </a>
  </div>
  `
  return linkBody
}