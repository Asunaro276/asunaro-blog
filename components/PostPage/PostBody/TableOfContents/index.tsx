import { Box, Typography } from "@mui/material"
import TocIcon from '@mui/icons-material/Toc';
import { Link as Scroll } from "react-scroll"

type Props = {
  heading: {
    text: string
    id: string
    htmlTag: string
  }[]
}

export const TableOfContents = (props: Props) => {
  let tocCount = [1, 1, 1]
  return (
    <Box className="border-solid border-slate-200 rounded w-10/12" border="double">
      <Box className="flex bg-slate-200 justify-center items-center h-8">
        <TocIcon className="mr-2" />
        <Typography className="">目次</Typography>
      </Box>
      <Box className="py-10 flex flex-col justify-center items-center">
        <ul className="w-7/12 pl-[calc(30%-8em)]">
          {props.heading.map((data, index) => {
            if (data.text === undefined) {
              return <div key={index}></div>
            }
            if (data.htmlTag === "h1") {
              tocCount[0] += 1
              tocCount[1] = 1
              return (
                <li key={index} className="list-none ml-6 my-4">
                  <Scroll to={`${data.id}`} smooth={true} className="relative hover:opacity-50 cursor-pointer flex" id={`l${index}`} duration={400}>
                    <Box className="absolute -left-10 border-solid border border-slate-400 w-10 aspect-square flex justify-center items-center rounded-full bg-slate-200 ">
                      {(tocCount[0] - 1).toString()}
                    </Box>
                    <Box className="ml-2 mt-2">
                      {data.text}
                    </Box>
                  </Scroll>
                </li>
              )
            }
            if (data.htmlTag === "h2") {
              tocCount[1] += 1
              tocCount[2] = 1
              return (
                <li key={index} className="my-2 list-none">
                  <Scroll to={`${data.id}`} smooth={true} className="hover:opacity-50 cursor-pointer flex" id={`${index}`} duration={400}>
                    <Box className="ml-5 mr-5 text-md">
                        {tocCount[0] > 1 ? 
                          `${(tocCount[0] - 1)}.${tocCount[1] - 1}` :
                          `${tocCount[1] - 1}`
                        }
                    </Box>
                    <Box className="ml-2">
                      {data.text}
                    </Box>
                  </Scroll>
                </li>
              )
            }
            // if (data.tag === "h3") {
            //   tocCount[2] += 1
            //   return (
            //     <li key={index} className="my-2 list-none">
            //       <Scroll to={`${data.id}`} smooth={true} className="hover:opacity-50 cursor-pointer flex" id={`${index}`} duration={400}>
            //         <Box className="ml-10 mr-5 text-md">
            //           {`${(tocCount[0] - 1)}.${tocCount[1] - 1}.${tocCount[2] - 1}`}
            //         </Box>
            //         <Box className="ml-2">
            //           {data.text}
            //         </Box>
            //       </Scroll>
            //     </li>
            //   )
            // }
        })}
        </ul>
      </Box>
    </Box>
  )
}