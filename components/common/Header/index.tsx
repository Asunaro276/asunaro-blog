import { Box, Link, Typography } from "@mui/material"
import { Category } from "types"
import { NavigationBar } from "./NavigationBar"


type Props = {
  categories: Category[]
}

const Header = (props: Props) => {
  const logo = "ASUNAROBLOG"
  return (
    <div>
      <Box className="flex justify-center" sx={{ marginLeft: "20px" }}>
        <Typography className="py-5 font-logo" sx={{ maxWidth: "1200px", flexGrow: 1, display: { xs: 'none', md: 'block' }, fontSize: { xs: 30, md: 40 }}}>
          <Link href="/" underline="none" className="text-slate-700" >
            {logo}
          </Link> 
        </Typography>
      </Box>
      <NavigationBar
        logo={logo}
        categories={props.categories}
      />
    </div>
  )
}

export default Header
