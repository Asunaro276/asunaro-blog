import { Box, CardMedia, Typography } from "@mui/material"
import { convertDateFormat } from "libs/convertDateFormat"
import Image from "next/image"

type Props = {
  title: string
  publishedAt: string
  imageUrl: string
  imageAlt: string
}

const Caption = (props: Props) => {
  return (
    <Box className="">
      <Box className="flex justify-center mb-10">
        <Typography color="text.secondary" variant="caption">
          {convertDateFormat(props.publishedAt)}
        </Typography>
      </Box>
      <Box className="text-center my-10">
        <Typography className="font-title text-2xl font-bold text-slate-600">
          {props.title}
        </Typography>
      </Box>
      <Box className="flex justify-center">
        <Box className="w-9/12">
          <CardMedia>
            <Image src={props.imageUrl} alt={props.imageAlt} width="800" height="350" objectPosition="50% 50%" objectFit="contain" />
          </CardMedia>
        </Box>
      </Box>
    </Box>
  )
}

export default Caption
