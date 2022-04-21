import { Box, Typography } from "@mui/material"
import { renderToc } from "libs/renderToc"
import { Link as Scroll } from "react-scroll"

type Props = {
  body: string
}

export const TableOfContents = (props: Props) => {
  const toc = renderToc(props.body)
  var tocCount = [1, 1, 1]
  return (
    <Box className="border-solid border-slate-200 rounded" border="double">
      <Typography className="bg-slate-200 text-center">目次</Typography>
      <Box className="ml-24 mr-32 py-10">
      <ul className="">
        {toc.map((data, index) => {
          if (data.tag === "h1") {
            tocCount[0] += 1
            return (
              <li key={data.id} className="mt-4">
                <Scroll to={`${data.id}`} smooth={true} className="hover:opacity-50 cursor-pointer flex" id={`l${index}`}>
                  <Box className="border-solid border-2 w-10 h-10  rounded-full text-center pt-1 bg-slate-200 font-montserrat text-lg">
                    {(tocCount[0] - 1).toString()}
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
            return (
              <li key={data.id} className="my-2">
                <Scroll to={`${data.id}`} smooth={true} className="hover:opacity-50 cursor-pointer flex" id={`${index}`}>
                  <Box className="ml-5 mr-5 text-md">
                      {`${(tocCount[0] - 1)}.${tocCount[1] - 1}`}
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
              <li key={data.id} className="my-2">
                <Scroll to={`${data.id}`} smooth={true} className="hover:opacity-50 cursor-pointer flex" id={`${index}`}>
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