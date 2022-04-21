import { Box, CardMedia, Typography } from "@mui/material"
import { convertDateFormat } from "libs/convertDateFormat"

type Props = {
  title: string
  publishedAt: string
  imageUrl: string
  imageAlt: string
}

const Caption = (props: Props) => {
  return (
    <Box>
      <Box className="flex justify-center mb-10">
        <Typography color="text.secondary" variant="caption">
          {convertDateFormat(props.publishedAt)}
        </Typography>
      </Box>
      <Box className="text-center my-10">
        <Typography variant="h4" className="font-biz">
          {props.title}
        </Typography>
      </Box>
      <Box className="mx-32">
        <CardMedia
          component="img"
          alt={props.imageAlt}
          image={props.imageUrl}
        />
      </Box>
    </Box>
  )
}

export default Caption
