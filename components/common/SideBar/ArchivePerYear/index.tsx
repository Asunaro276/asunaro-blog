import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material'
import NextLink from 'next/link'

type Props = {
  years: { [key: number]: number }
}

const ArchivePerYear = (props: Props) => {
  return (
    <Card>
      <CardContent sx={{ paddingBottom: '1.5em', fontWeight: 600 }}>Archive</CardContent>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        {Object.keys(props.years).map((year) => (
          <Box key={year}>
            <Divider variant='middle' />
            <Box sx={{ paddingLeft: '1em', paddingY: '0.5em' }}>
              <NextLink href={`/year/${year}`} passHref>
                <Button variant='text' sx={{ textTransform: 'none', fontSize: '1rem' }}>
                  {year}
                  <Typography sx={{ display: 'inline', color: 'black', paddingLeft: '0.2em' }}>
                    {' '}
                    ({props.years[Number(year)]})
                  </Typography>
                </Button>
              </NextLink>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}

export default ArchivePerYear
