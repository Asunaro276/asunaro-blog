import * as React from 'react';
import MuiPagination from '@mui/material/Pagination';
import MuiPaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';
import { PER_PAGE } from 'pages';

type Props = {
  dir: string
  pageNumber: number
  totalCount: number
}


const Pagination = ({ dir, pageNumber, totalCount }: Props) => {
  return (
    <MuiPagination
      page={pageNumber}
      count={Math.ceil(totalCount/PER_PAGE)}
      // count={10}
      renderItem={(item) => {
        return (
          <Link href={item.page === 1 ? `/${dir}` : `${dir}/${item.page}`} passHref>
            <MuiPaginationItem
              {...item}
              component={"a"}
              disabled={item.page === pageNumber}
            />
          </Link>
          )        
      }
      }
    />
  );
}

export default Pagination
