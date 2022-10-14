import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Container, IconButton, Link as MuiLink, Menu, MenuItem, Typography } from '@mui/material'
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
              className=''
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
                    href={category.id}
                    as={[...category.id.split("/").slice(0, -1), category.name].join("/")}
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
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontSize: { xs: 25, md: 60 } }}
          >
            <NextLink href="/" passHref>
              <MuiLink underline="none" color="inherit" rel="noopener noreferrer">
                {props.logo}
              </MuiLink>
            </NextLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {props.categories.map((category, index) => (
              <NextLink
                href={category.id}
                passHref
                key={index}
              >
                <MuiLink
                  onClick={handleCloseNavMenu}
                  sx={{ mx: {md: 1, lg: 3}, my: 1, display: 'block' }}
                  underline="none"
                  color="inherit"
                  className='flex text-lg hover:bg-slate-400 ease-out duration-100 p-3'
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
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
