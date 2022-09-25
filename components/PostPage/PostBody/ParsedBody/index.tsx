import { FileCopyRounded, FileCopySharp } from "@mui/icons-material"
import { Box, BoxProps, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import { BlogBody, Code, Link, Paragraph } from "types"
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
            case "code":
              return (
                <Box className="relative">
                  <Typography className="absolute text-center inline-block px-2 text-white bg-slate-500">
                    {(field as Code).fileName}
                  </Typography>
                  <MarkdownTemplate html={(field as Code).code} key={index} /> 
                </Box>
              )
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
