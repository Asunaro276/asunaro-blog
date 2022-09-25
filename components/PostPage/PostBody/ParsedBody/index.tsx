import { Box, BoxProps } from "@mui/material"
import { BlogBody, Link, Paragraph } from "types"
import { LinkCard } from "./LinkCard"
import { MarkdownTemplate } from "./MarkdownTemplate"

type Props = {
  body: BlogBody
} & BoxProps

export const ParsedBody = (props: Props) => {
  return (
    <Box>
      {
        props.body.map((field, index) => {
          switch (field.fieldId) {
            case "paragraph":
              return <MarkdownTemplate html={(field as Paragraph).paragraph} key={index} />
            case "link":
              const link = {
                fieldId: field.fieldId,
                url: (field as Link).url,
                title: (field as Link).title,
                image: (field as Link).image,
                linkTo: (field as Link).linkTo,
              }
              return <LinkCard link={link} key={index} />
            default:
              return <></>
          }
        })
      }
    </Box>
  )
}
