import { Box, List, ListItem, Typography } from '@mui/material'
import TocIcon from '@mui/icons-material/Toc'
import { Link as Scroll } from 'react-scroll'
import { Heading } from 'types'

type Props = {
  heading: Heading[]
}

export const TableOfContents = (props: Props) => {
  let tocCount = [1, 1, 1]
  return (
    <Box className='rounded border-solid border-slate-200' border='double' sx={{ width: { xs: '90%', sx: '70%' }}}>
      <Box className='flex h-8 items-center justify-center bg-slate-200'>
        <TocIcon className='mr-2' />
        <Typography className=''>目次</Typography>
      </Box>
      <Box className='flex flex-col items-center justify-center py-10'>
        <List className='pl-2' sx={{ width: { xs: '90%', sx: '70%' }}}>
          {props.heading.map((data, index) => {
            if (data.text === undefined) {
              return <div key={index}></div>
            }
            if (data.htmlTag === 'h1') {
              tocCount[0] += 1
              tocCount[1] = 1
              return (
                <ListItem key={index} className='my-4 ml-6 list-none'>
                  <Scroll
                    to={`${data._id}`}
                    smooth={true}
                    className='relative flex cursor-pointer hover:opacity-50'
                    id={`l${index}`}
                    duration={400}
                  >
                    <Box className='absolute -left-10 flex aspect-square w-8 items-center justify-center rounded-full border border-solid border-slate-400 bg-slate-200 sm:w-10 '>
                      {(tocCount[0] - 1).toString()}
                    </Box>
                    <Box className='ml-2 mt-2'>{data.text}</Box>
                  </Scroll>
                </ListItem>
              )
            }
            if (data.htmlTag === 'h2') {
              tocCount[1] += 1
              tocCount[2] = 1
              return (
                <li key={index} className='my-2 list-none'>
                  <Scroll
                    to={`${data._id}`}
                    smooth={true}
                    className='flex cursor-pointer hover:opacity-50'
                    id={`${index}`}
                    duration={400}
                  >
                    <Box className='text-md sm:ml-5 sm:mr-5'>
                      {tocCount[0] > 1
                        ? `${tocCount[0] - 1}.${tocCount[1] - 1}`
                        : `${tocCount[1] - 1}`}
                    </Box>
                    <Box className='ml-2'>{data.text}</Box>
                  </Scroll>
                </li>
              )
            }
            // if (data.tag === "h3") {
            //   tocCount[2] += 1
            //   return (
            //     <li key={index} className="my-2 list-none">
            //       <Scroll to={`${data.id}`} smooth={true} className="hover:opacity-50 cursor-pointer flex" id={`${index}`} duration={400}>
            //         <Box className="ml-10 mr-5 text-md">
            //           {`${(tocCount[0] - 1)}.${tocCount[1] - 1}.${tocCount[2] - 1}`}
            //         </Box>
            //         <Box className="ml-2">
            //           {data.text}
            //         </Box>
            //       </Scroll>
            //     </li>
            //   )
            // }
          })}
        </List>
      </Box>
    </Box>
  )
}
