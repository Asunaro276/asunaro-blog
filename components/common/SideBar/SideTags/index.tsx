import { Card, CardContent, Button, Divider, Box } from "@mui/material"
import NextLink from "next/link"
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { TagResponse } from "types"


type Props = {
  tags: TagResponse[]
}

const SideTag = (props: Props) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ paddingBottom: "1.5em", fontWeight: 600 }}>
        TagResponses
      </CardContent>
      <CardContent className="" sx={{ display: "flex", flexWrap: "wrap", overflowY: "scroll", height: "70%" }}>
        {props.tags.map(tag => (
          <Box key={tag._id} sx={{ marginTop: "1rem" }}>
            <NextLink href={`/tag/${tag._id}`} passHref>
              <Button variant="contained" size="small" className="mr-4 text-xs" sx={{ textTransform: "none", display: "flex" }}>
                <LocalOfferIcon fontSize="small" className="mr-0.5" />
                {tag.tag}（{tag.tagTotalCount}）
              </Button>
            </NextLink>
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}

export default SideTag
