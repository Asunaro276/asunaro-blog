import { ThemeProvider } from "@emotion/react"
import { Box, Typography } from "@mui/material"
import { titleFontTheme } from "theme"
import NavigationBar from "../molecules/NavigationBar"

const pages = ["Home", "About"]
const linkTo = ["/", "about"]

type Props = {

}

const Header = (props: Props) => {
  const logo = "Asunaro Blog"
  return (
    <div>
      <Typography className="ml-10 font-montserrat" sx={{flexGrow: 1, display: { xs: 'none', md: 'block' }, fontSize: { xs: 30, md: 60 }}}>
          {logo}
      </Typography>
      <NavigationBar
        logo={logo}
        linkTo={linkTo}
        pages={pages}
      />
    </div>
  )
}

export default Header
