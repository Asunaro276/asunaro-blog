import { Box, Typography } from "@mui/material"
import TocIcon from '@mui/icons-material/Toc';
import { Link as Scroll } from "react-scroll"

type Props = {
  heading: {
    text: string
    id: string
    tag: string
  }[]
}

export const TableOfContents = (props: Props) => {
  let tocCount = [1, 1, 1]
  return (
    <Box className="border-solid border-slate-200 rounded w-8/12" border="double">
      <Box className="flex bg-slate-200 justify-center items-center h-8">
        <TocIcon className="mr-2" />
        <Typography className="">目次</Typography>
      </Box>
      <Box className="py-10" sx={{ marginX: "10%" }}>
      <ul className="">
        {props.heading.map((data, index) => {
          if (data.text === undefined) {
            return <div key={index}></div>
          }
          if (data.tag === "h1") {
            tocCount[0] += 1
            tocCount[1] = 1
            return (
              <li key={index} className="mt-4 list-none">
                <Scroll to={`${data.id}`} smooth={true} className="hover:opacity-50 cursor-pointer flex" id={`l${index}`} duration={400}>
                  <Box className="border-solid border border-slate-400 w-10 h-10 flex justify-center items-center rounded-full bg-slate-200 ">
                    <Typography className="font-body text-lg">
                      {(tocCount[0] - 1).toString()}
                    </Typography>
                  </Box>
                  <Box className="ml-2 mt-2">
                    {data.text}
                  </Box>
                </Scroll>
              </li>
            )
          }
          if (data.tag === "h2") {
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
          if (data.tag === "h3") {
            tocCount[2] += 1
            return (
              <li key={index} className="my-2 list-none">
                <Scroll to={`${data.id}`} smooth={true} className="hover:opacity-50 cursor-pointer flex" id={`${index}`} duration={400}>
                  <Box className="ml-10 mr-5 text-md">
                    {`${(tocCount[0] - 1)}.${tocCount[1] - 1}.${tocCount[2] - 1}`}
                  </Box>
                  <Box className="ml-2">
                    {data.text}
                  </Box>
                </Scroll>
              </li>
            )
          }
      })}
      </ul>
      </Box>
    </Box>
  )
}