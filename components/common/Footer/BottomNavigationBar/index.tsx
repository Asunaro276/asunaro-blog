import { Link } from "@mui/material"

type Props = {
  pages: string[]
  linkTo: string[]
}


export const BottomNavigationBar = (props: Props) => {
  return (
    <div className="h-20 bg-slate-500">
      <div className="flex flex-row justify-center pt-5">
        {props.pages.map((page, index) => {
          return (
            <div className="text-white mx-6" key={index}>
              <Link href={props.linkTo[index]} color="inherit" className="hover:text-slate-300">
                {page}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}