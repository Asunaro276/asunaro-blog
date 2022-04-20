import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Link from 'next/link'

type Props = {
  linkTo: string[]
  contents: string[]
}

const LinkButtonGroup = (props: Props) => {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {props.contents.map((content, index) => {        
        return (
          <Button>
            <Link href={props.linkTo[index]}>
              {content}
            </Link>
          </Button>
        )
      })}
    </ButtonGroup>
  );
}

export default LinkButtonGroup
