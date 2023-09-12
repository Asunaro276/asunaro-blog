import { CategoryResponse } from 'types'
import { BottomNavigationBar } from './BottomNavigationBar'
import { CopyRight } from './CopyRight'

type Props = {
  categories: CategoryResponse[]
}

const Footer = (props: Props) => {
  return (
    <div>
      <BottomNavigationBar categories={props.categories} />
      <CopyRight />
    </div>
  )
}

export default Footer
