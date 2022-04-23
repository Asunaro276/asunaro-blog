import { Box, Card, Typography } from "@mui/material"
import { Link as Scroll } from "react-scroll"

type Props = {
  parsedBody: { text: string
    id: string
    tag: string
  }[]
}

export const SideToc = (props: Props) => {
  var tocCount = [1, 1, 1]
  return (
    <Card className="border-solid border-slate-200 rounded">
      <Typography className="mt-10 text-center">目次</Typography>
      <Box sx={{ marginX: "10%" }}>
      <ul className="mb-10">
        {props.parsedBody.map((data, index) => {
          if (data.text === undefined) {
            return <div></div>
          }
          if (data.tag === "h1") {
            tocCount[0] += 1
            return (
              <li key={data.id} className="mt-4">
                <Scroll to={`${data.id}`} smooth={true} className="hover:opacity-50 cursor-pointer flex" id={`l${index}`} duration={400}>
                  <Box className="border-solid border-2 w-10 h-10  rounded-full text-center pt-1 bg-slate-200 font-body text-lg">
                    {(tocCount[0] - 1).toString()}
                  </Box>
                  <Box className="ml-2 mt-2">
                    {data.text}
                  </Box>
                </Scroll>
              </li>
            )
          }
          if (data.tag === "h2" && tocCount[0] === 1) {
            tocCount[1] += 1
            return (
              <li key={data.id} className="my-2">
                <Scroll to={`${data.id}`} smooth={true} className="hover:opacity-50 cursor-pointer flex" id={`${index}`} duration={400}>
                  <Box className="ml-5 mr-5 text-md">
                      {`${tocCount[1] - 1}`}
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
          //     <li key={data.id} className="my-2">
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
    </Card>
  )
}