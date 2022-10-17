import { Link as MuiLink, Box, Card, CardContent, Button } from "@mui/material"
import NextLink from "next/link"
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Tag } from "types"
import { TagSharp } from "@mui/icons-material"

type Props = {
  tags: Tag[]
}

const SideCategory = (props: Props) => {
  return (
    <Card>
      <CardContent className="space-y-4" sx={{ display: "flex", flexWrap: "wrap" }}>
        {props.tags.map(tag => (
          <NextLink href={`/tag/${tag.id}`} key={tag.id} passHref>
            <Button variant="contained" size="small" className="mr-4 text-xs" sx={{ textTransform: "none", display: "flex" }}>
              <LocalOfferIcon fontSize="small" className="mr-0.5" />
              {tag.tag}（{tag.tagTotalCount}）
            </Button>
          </NextLink>
        ))}
      </CardContent>
    </Card>
  )
}

export default SideCategory
