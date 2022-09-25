import { Box, BoxProps, Link, Typography } from "@mui/material"
import parse, { DOMNode, domToReact, Element, HTMLReactParserOptions, Node, ProcessingInstruction, Text } from "html-react-parser"
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github-dark.css'
import Highlight from "react-highlight"

hljs.registerLanguage("xml", xml)
hljs.registerLanguage("javascript", javascript)

type MarkdownTemplateProps = {
  html: string,
  fileName?: string,
} & BoxProps


const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (domNode.type === "tag") {
      if ((domNode as Element).name === "h1") {
        return (
          <Box className="bg-slate-100 mb-5 mt-20 flex" id={(domNode as Element).attribs.id}>
            <Box className="w-2 bg-yellow-400"></Box>
              <Typography variant="h1" className="ml-8 my-5 text-3xl font-semibold font-body">
                {domToReact((domNode as Element).children, options)}
              </Typography>
          </Box>
        )
      }
      if ((domNode as Element).name === "h2") {
        return (
          <Box className="my-8 flex" id={(domNode as Element).attribs.id}>
            <Box className="w-2 bg-yellow-400"></Box>
            <Typography className="ml-4 my-2 text-xl font-semibold font-body">
              {domToReact((domNode as Element).children, options)}
            </Typography>
          </Box>
        )
      }
      if ((domNode as Element).name === "ul") {
        return (
          <ul className="list-disc list-inside text-lg space-y-2 ml-6 pl-4 indent-[-1em]">
            {domToReact((domNode as Element).children, options)}
          </ul>
        )
      }
      if ((domNode as Element).name === "code") {
        return (
          <Highlight className="pt-14">
            {domToReact((domNode as Element).children, options)}
          </Highlight>
        )
      }
      if ((domNode as Element).name === "p") {
        return (
          <Box className="my-5">
            <Typography className="text-lg font-body leading-loose">
              {domToReact((domNode as Element).children, options)}
            </Typography>
          </Box>
        )
      }
      if ((domNode as Element).name === "a") {
        return (
          <Link href={(domNode as Element).attribs.href}>{domToReact((domNode as Element).children, options)}</Link>
        )
      }
      if ((domNode as Element).name === "blockquote") {
        return (
        <Box className="flex">
          <Box className="w-2 bg-slate-200"></Box>
          <Box className="ml-4 text-xl opacity-90 font-body">
            {domToReact((domNode as Element).children, options)}
          </Box>
        </Box>
        )
      }
      if ((domNode as Element).name === "html"
        || (domNode as Element).name === "head"
        || (domNode as Element).name === "body") {
        return (
          <>{domToReact((domNode as Element).children, options)}</>
        )
      }
    }
  }
}

export const MarkdownTemplate = (props: MarkdownTemplateProps) => {
  return <Box {...props}>{parse(props.html, options)}</Box>
}
