import { ThemeProvider } from "@emotion/react"
import { Box, Typography } from "@mui/material"
import { titleFontTheme } from "theme"
import NavigationBar from "../molecules/NavigationBar"


type Props = {
  pages: string[]
  linkTo: string[]
}

const Header = (props: Props) => {
  const logo = "Asunaro Blog"
  return (
    <div>
      <Typography className="py-8 ml-10 font-montserrat" sx={{flexGrow: 1, display: { xs: 'none', md: 'block' }, fontSize: { xs: 30, md: 60 }}}>
          {logo}
      </Typography>
      <NavigationBar
        logo={logo}
        linkTo={props.linkTo}
        pages={props.pages}
      />
    </div>
  )
}

export default Header
