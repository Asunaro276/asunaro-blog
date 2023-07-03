import { Box } from "@mui/material"
import { Heading, TagResponse } from "types"
import SideProfile from "./SideProfile"
import SideTag from "./SideTags"
import SideToc from "./SideToc"
import ArchivePerYear from "./ArchivePerYear"

type Props = {
  headings?: Heading[]
  tags: TagResponse[]
  years: { [key: number]: number }
}


const SideBar = (props: Props) => {
  return (
    <Box className="h-full">
      <Box>
        <Box className="mb-8">
          <SideProfile />
        </Box>
        <Box className="mb-8" sx={{ height: "400px" }}>
          <SideTag tags={props.tags} />
        </Box>
        <Box className="mb-8">
          <ArchivePerYear years={props.years} />
        </Box>
      </Box>
      {props.headings !== undefined &&
      (<Box className="box-border sticky top-4" sx={{ display: { xs: "none", md: "block" } }}>
        <SideToc
          heading={props.headings}
        />
      </Box>)}
    </Box>
  )
}

export default SideBar
