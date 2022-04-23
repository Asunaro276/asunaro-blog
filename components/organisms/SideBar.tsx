import { Box } from "@mui/material"
import SideProfile from "components/molecules/SideProfile"
import { SideToc } from "components/molecules/SideToc"

type Props = {
  heading?: {
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
      <Box className="box-border" sx={{ height: `calc(100% - ${profileHeight}rem)` }}>
        {props.heading !== undefined &&
          (<Box className="sticky top-4">
            <SideToc
              heading={props.heading}
            />
          </Box>)}
      </Box>
    </Box>
  )
}

export default SideBar
