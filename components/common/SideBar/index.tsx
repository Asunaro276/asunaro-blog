import { Box } from "@mui/material"
import { Tag } from "types"
import SideProfile from "./SideProfile"
import SideCategory from "./SideTags"
import SideToc from "./SideToc"

type Props = {
  headings?: {
    text: string
    id: string
    htmlTag: string
  }[]
  tags: Tag[]
}


const SideBar = (props: Props) => {
  const profileHeight = 30
  return (
    <Box className="h-full">
      <Box className="mb-8" sx={{ height: {md: `calc(${profileHeight}rem)` }}}>
        <SideProfile />
      </Box>
      <Box className="mb-8">
        <SideCategory tags={props.tags} />
      </Box>
      {props.headings !== undefined &&
      (<Box className="box-border" sx={{ display: {xs: "none", md: "block"}, height: `calc(100% - ${profileHeight}rem)` }}>
          <Box className="sticky top-4">
            <SideToc
              heading={props.headings}
            />
          </Box>
      </Box>)}
    </Box>
  )
}

export default SideBar
