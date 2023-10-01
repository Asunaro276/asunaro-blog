import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import {
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
  Typography,
  Grid,
  Container,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { pageIcons } from 'pages'
import { CategoryResponse } from 'types'
import NextLink from 'next/link'

type Props = {
  logo: string
  categories: CategoryResponse[]
}

export const NavigationBar = (props: Props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const categories = [
    {
      _id: '/',
      _sys: {
        raw: {
          createdAt: '',
          updatedAt: '',
          firstPublishedAt: '',
          publishedAt: '',
        },
        customOrder: 0,
        createdAt: '',
        updatedAt: '',
      },
      displayedName: 'HOME',
      name: 'home',
    },
    ...props.categories,
  ]
  return (
    <AppBar position='static' className='bg-slate-500' sx={{ paddingY: { xs: 1, sm: 2, md: 0 } }}>
      <Toolbar disableGutters sx={{ position: 'relative' }}>
        <Box
          sx={{ display: { xs: 'flex', md: 'none' }, position: { sm: 'absolute' }, left: '30px' }}
        >
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
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
            {categories.map((category, index) => (
              <MenuItem
                key={index}
                onClick={handleCloseNavMenu}
                className='text-lg duration-100 ease-out hover:bg-slate-200'
                sx={{ paddingTop: '10px' }}
              >
                <NextLink href={category._id} passHref>
                  <MuiLink
                    underline='none'
                    color='inherit'
                    className='flex'
                    rel='noopener noreferrer'
                  >
                    <Box sx={{ marginRight: '5px' }}>{pageIcons[index]}</Box>
                    <Box>{category.displayedName}</Box>
                  </MuiLink>
                </NextLink>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          className='font-logo'
          variant='h6'
          noWrap
          component='div'
          sx={{
            width: '100%',
            display: { xs: 'flex', md: 'none' },
            fontSize: { xs: 25, md: 60 },
            justifyContent: 'center',
          }}
        >
          <NextLink href='/' passHref>
            <MuiLink underline='none' color='inherit' rel='noopener noreferrer'>
              {props.logo}
            </MuiLink>
          </NextLink>
        </Typography>
        <Container sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Grid container maxWidth='lg'>
            {categories.map((category, index) => (
              <Box key={index} marginRight='30px'>
                <NextLink href={category._id} passHref>
                  <MuiLink
                    onClick={handleCloseNavMenu}
                    sx={{ display: 'block', paddingBottom: '10px', paddingTop: '14px' }}
                    underline='none'
                    color='inherit'
                    className='flex text-lg duration-100 ease-out hover:bg-slate-400'
                    variant='button'
                    rel='noopener noreferrer'
                  >
                    <Box sx={{ marginRight: '5px' }}>{pageIcons[index]}</Box>
                    <Box>{category.displayedName}</Box>
                  </MuiLink>
                </NextLink>
              </Box>
            ))}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
