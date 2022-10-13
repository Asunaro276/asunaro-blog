import { Box } from "@mui/material"
import SideProfile from "./SideProfile"
import SideToc from "./SideToc"

type Props = {
  headings?: {
    text: string
    id: string
    tag: string
  }[]
}


const SideBar = (props: Props) => {
  const profileHeight = 32 
  return (
    <Box className="h-full">
      <Box sx={{ height: `calc(${profileHeight}rem)` }}>
        <SideProfile />
      </Box>
      <Box className="box-border" sx={{ display: {xs: "none", md: "block"}, height: `calc(100% - ${profileHeight}rem)` }}>
        {props.headings !== undefined &&
          (<Box className="sticky top-4">
            <SideToc
              heading={props.headings}
            />
          </Box>)}
      </Box>
    </Box>
  )
}

export default SideBar
