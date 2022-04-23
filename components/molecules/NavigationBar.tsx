import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Container, IconButton, Link, Menu, MenuItem, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { pages, pageIcons } from 'pages'

type Props = {
  logo: string
  linkToId: string[]
}

const NavigationBar = (props: Props) => {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  };

  return (
    <AppBar position="static" className="bg-slate-500" sx={{ paddingY: {xs: 2, md:0} }}>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                height: 300,
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    href={props.linkToId[index]}
                    underline="none"
                    color="inherit"
                    className='text-lg flex hover:text-slate-300 ease-out duration-100'
                  >
                    <Box className="mr-1">
                      {pageIcons[index]}
                    </Box>
                    <Box className='pt-0.5'>
                      {page}
                    </Box>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            className='font-logo'
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontSize: { xs: 30, md: 60 } }}
          >
            {props.logo}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Box>
                <Link
                  key={page}
                  onClick={handleCloseNavMenu}
                  href={props.linkToId[index]}
                  sx={{ mx:4, my: 2, display: 'block' }}
                  underline="none"
                  color="inherit"
                  className='text-lg flex hover:text-slate-600 ease-out duration-100'
                >
                  <Box className="mr-1">
                    {pageIcons[index]}
                  </Box>
                  <Box className='pt-0.5'>
                    {page}
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar
