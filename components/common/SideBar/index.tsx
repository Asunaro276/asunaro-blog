import { Box } from "@mui/material"
import { Tag } from "types"
import SideProfile from "./SideProfile"
import SideTag from "./SideTags"
import SideToc from "./SideToc"
import ArchivePerYear from "./ArchivePerYear"

type Props = {
  headings?: {
    text: string
    id: string
    htmlTag: string
  }[]
  tags: Tag[]
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
      (<Box className="box-border" sx={{ display: { xs: "none", md: "block" } }}>
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
