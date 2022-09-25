import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Link, Typography } from "@mui/material"
import { Link as relatedLink }  from "types"

type Props = {
  link: relatedLink
}

export const LinkCard = ({ link }: Props) => {
  return (
    <Card className="max-h-56 shadow-outline bg-slate-50">
      <CardActionArea href={link.url} target="_blank" rel="noopener noreferrer">
        <CardContent className="flex justify-evenly">
          <CardMedia src={link.image.url} component="img" sx={{width: 120}} />
          <Box className="flex flex-col justify-center items-start space-y-5">
            <Typography className="text-lg text-blue-700 underline">
              {link.title}
            </Typography>
            {Boolean(link.linkTo) && 
            <Button className="max-h-20" variant="contained" color="primary" sx={{textTransform: "none"}}>
              {link.linkTo}でみる
            </Button>}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}