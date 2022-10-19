import { Box } from "@mui/material"
import { Tag } from "types"
import SideProfile from "./SideProfile"
import SideTag from "./SideTags"
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
  const profileHeight = 61
  return (
    <Box className="h-full">
      <Box sx={{ height: `calc(${profileHeight}rem)` }}>
        <Box className="mb-8">
          <SideProfile />
        </Box>
        <Box className="mb-8">
          <SideTag tags={props.tags} />
        </Box>
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
