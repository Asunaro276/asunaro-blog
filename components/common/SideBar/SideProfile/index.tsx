import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'

export const SideProfile = () => {
  return (
    <Box className='h-full justify-end'>
      <Card className='h-full'>
        <CardContent className=''>
          <Typography className='my-5 text-center'>profile</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '2rem' }}>
            <CardMedia
              component='img'
              src='https://storage.googleapis.com/p_641d41d3a492e5ac4c9226fe/3ab0e1e0-e610-4dc9-acb4-f7917add37b1/asunaro.png'
              height='150'
              sx={{ width: '150px', borderRadius: '100%' }}
            />
          </Box>
          <Typography className='text-center'>あすなろ</Typography>
          <Box className='flex justify-center'>
            <Divider className='w-20' />
          </Box>
          <Typography className='my-10 px-10'>
            新米エンジニアの技術ブログです。主にWeb技術や数学で遊んでいます。日々楽しみながら学んでいくことを目標としています．
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
