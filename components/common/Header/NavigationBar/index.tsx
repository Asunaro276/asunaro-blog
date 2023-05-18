import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Container, IconButton, Link as MuiLink, Menu, MenuItem, Typography, Grid } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { pageIcons } from 'pages'
import { Category } from 'types'
import NextLink from 'next/link'

type Props = {
  logo: string
  categories: Category[]
}

export const NavigationBar = (props: Props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  };

  return (
    <AppBar position="static" className="bg-slate-500" sx={{ paddingY: {xs: 1, sm: 2, md:0} }}>
        <Toolbar disableGutters sx={{ position: "relative" }}>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, position: {sm: "absolute"}, left: "30px" }}>
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
              {props.categories.map((category, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu} className='text-lg hover:bg-slate-200 ease-out duration-100'>
                  <NextLink
                    href={category._id}
                    passHref
                  >
                    <MuiLink
                      underline="none"
                      color="inherit"
                      className='flex'
                      rel="noopener noreferrer"
                    >
                      <Box className="mr-1 pt-0.5">
                        {pageIcons[index]}
                      </Box>
                      <Box className=''>
                        {category.displayedName}
                      </Box>
                    </MuiLink>
                  </NextLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            className='font-logo'
            variant="h6"
            noWrap
            component="div"
            sx={{ width: "100%", display: { xs: 'flex', md: 'none' }, fontSize: { xs: 25, md: 60 }, justifyContent: "center"}}
          >
            <NextLink href="/" passHref>
              <MuiLink underline="none" color="inherit" rel="noopener noreferrer">
                {props.logo}
              </MuiLink>
            </NextLink>
          </Typography>
          <Box sx={{ width: "100%", display: { xs: "none", md: "flex" }, justifyContent: "center", marginLeft: "30px" }}>
            <Box sx={{ maxWidth: "1300px", width: "100%", display: "flex" }}>
              {props.categories.map((category, index) => (
                <Box key={index} sx={{ marginRight: "20px" }}>
                  <NextLink
                    href={category._id}
                    passHref
                  >
                    <MuiLink
                      onClick={handleCloseNavMenu}
                      sx={{ display: 'block', padding: "10px" }}
                      underline="none"
                      color="inherit"
                      className='flex text-lg hover:bg-slate-400 ease-out duration-100'
                      variant="button"
                      rel="noopener noreferrer"
                    >
                      <Box className="mr-1 pt-0.5">
                        {pageIcons[index]}
                      </Box>
                      <Box>
                        {category.displayedName}
                      </Box>
                    </MuiLink>
                  </NextLink>
                </Box>
              ))}
            </Box>
          </Box>
        </Toolbar>
    </AppBar>
  );
};
