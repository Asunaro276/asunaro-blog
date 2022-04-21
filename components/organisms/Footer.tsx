import { BottomNavigationBar } from "../molecules/BottomNavigationBar"
import { CopyRight } from "../molecules/CopyRight"

type Props = {
  pages: string[]
  linkTo: string[]
}

export const Footer = (props: Props) => {
  return (
    <div>
      <BottomNavigationBar
        pages={props.pages}
        linkTo={props.linkTo}
      />
      <CopyRight />
    </div>
  )
}
