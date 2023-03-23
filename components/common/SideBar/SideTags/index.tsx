import { Card, CardContent, Button, Divider, Box } from "@mui/material"
import NextLink from "next/link"
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Tag } from "types"


type Props = {
  tags: Tag[]
}

const SideTag = (props: Props) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ paddingBottom: "1.5em", fontWeight: 600 }}>
        Tags
      </CardContent>
      <CardContent className="space-y-4" sx={{ display: "flex", flexWrap: "wrap", overflowY: "scroll", height: "70%"}}>
        {props.tags.map(tag => (
          <Box key={tag.id}>
            <NextLink href={`/tag/${tag.id}`} passHref>
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
