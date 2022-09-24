import { Link, Typography } from "@mui/material"
import { NavigationBar } from "./NavigationBar"


type Props = {
  linkToId: string[]
  
}

const Header = (props: Props) => {
  const logo = "Asunaro Blog"
  return (
    <div>
      <Typography className="py-5 ml-10 font-logo" sx={{flexGrow: 1, display: { xs: 'none', md: 'block' }, fontSize: { xs: 30, md: 40 }}}>
        <Link href="/" underline="none" className="text-slate-700" >
          {logo}
        </Link> 
      </Typography>
      <NavigationBar
        logo={logo}
        linkToId={props.linkToId}
      />
    </div>
  )
}

export default Header
