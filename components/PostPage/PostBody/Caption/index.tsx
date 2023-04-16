import { Box, Button, CardMedia, Link as MuiLink, Typography } from "@mui/material"
import { convertDateFormat } from "libs/convertDateFormat"
import Image from "next/image"
import NextLink from "next/link"
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Category, Tag } from "types"

type Props = {
  title: string
  publishedAt: string
  tagsOfPost: Tag[]
  categoryOfPost: Category
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
      <Box className="flex justify-center mt-10 mb-4">
        <Typography className="w-9/12 font-title text-2xl font-bold text-slate-600">
          {props.title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box className="w-9/12">
          <Box className="mb-10 space-y-2" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
            <NextLink href={`/category/${props.categoryOfPost._id}`} passHref>
              <Button className="mr-2" variant="outlined" sx={{ textTransform: "none", display: "flex" }} size="small">
                {props.categoryOfPost.displayedName}
              </Button>
            </NextLink>
            {props.tagsOfPost.map(tag => (
              <NextLink href={`/tag/${tag._id}`} key={tag._id} passHref>
                <MuiLink className="text-sm mr-2" sx={{ textTransform: "none", display: "flex" }}>
                  <LocalOfferIcon fontSize="small" />
                  {tag.tag}
                </MuiLink>
              </NextLink>
            ))}
          </Box>
          <CardMedia>
            <img src={props.imageUrl} alt={props.imageAlt} width="600" height="350" />
          </CardMedia>
        </Box>
      </Box>
    </Box>
  )
}

export default Caption
