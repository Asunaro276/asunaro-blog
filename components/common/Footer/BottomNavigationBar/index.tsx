import { Box, Divider, Link } from "@mui/material"

type Props = {
  pages: string[]
  linkTo: string[]
}

export const BottomNavigationBar = (props: Props) => {
  return (
    <Box className="bg-slate-500" sx={{ height: { xs: "50", sm: "20" } }}>
      <Box className="flex justify-center pt-5" sx={{ flexDirection: { xs: "column", sm: "row" } }}>
        {props.pages.map((page, index) => {
          return (
            <Box key={index}>
              <div className="text-white mx-6 my-2">
                <Link href={props.linkTo[index]} color="inherit" underline="hover" className="hover:text-slate-200">
                  {page}
                </Link>
              </div>
              {index < props.pages.length - 1 && 
              <Divider variant="fullWidth" light sx={{ display: { xs: "block", sm: "none", borderTop: "1px dashed", borderBottom: "0"}, borderColor: "white" }} />}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}