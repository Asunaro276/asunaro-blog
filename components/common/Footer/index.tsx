import { BottomNavigationBar } from "./BottomNavigationBar"
import { CopyRight } from "./CopyRight"

type Props = {
  pages: string[]
  linkTo: string[]
}

const Footer = (props: Props) => {
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

export default Footer
