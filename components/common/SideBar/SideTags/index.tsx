import { Card, CardContent, Button, Box } from "@mui/material"
import NextLink from "next/link"
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Tag } from "types"
import { useState } from "react"
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material"


type Props = {
  tags: Tag[]
}

const SideTag = (props: Props) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }
  return (
    <Card>
      <CardContent className="space-y-4" sx={{ display: "flex", flexWrap: "wrap" }}>
        {props.tags.slice(0, 10).map(tag => (
          <NextLink href={`/tag/${tag.id}`} key={tag.id} passHref>
            <Button variant="contained" size="small" className="mr-4 text-xs" sx={{ textTransform: "none", display: "flex" }}>
              <LocalOfferIcon fontSize="small" className="mr-0.5" />
              {tag.tag}（{tag.tagTotalCount}）
            </Button>
          </NextLink>
        ))}
      </CardContent>
      <CardContent>
        <Box className={open ? "mb-4" : ""} sx={{ display: "flex", justifyContent: "center", transitionDuration: "1000" }}>
          <Button onClick={handleOpen}>
            {open ? <ArrowDropUp /> : <ArrowDropDown />}
            すべてのタグ
          </Button>
        </Box>
        {open &&
        (<Box className="space-y-4" sx={{ display: "flex", flexWrap: "wrap" }}>
          {props.tags.slice(10).map(tag => (
            <NextLink href={`/tag/${tag.id}`} key={tag.id} passHref>
              <Button variant="contained" size="small" className="mr-4 text-xs" sx={{ textTransform: "none", display: "flex" }}>
                <LocalOfferIcon fontSize="small" className="mr-0.5" />
                {tag.tag}（{tag.tagTotalCount}）
              </Button>
            </NextLink>
          ))}
        </Box>)
        }
      </CardContent>
    </Card>
  )
}

export default SideTag
