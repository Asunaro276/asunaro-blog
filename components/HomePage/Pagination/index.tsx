import * as React from 'react';
import MuiPagination from '@mui/material/Pagination';
import MuiPaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';
import { PER_PAGE } from 'pages';
import { ConstructionOutlined } from '@mui/icons-material';

type Props = {
  dir: string
  pageNumber: number
  totalCount: number
}

const Pagination = ({ dir, pageNumber, totalCount }: Props) => {
  const totalPages = Math.ceil(totalCount / PER_PAGE) 
  return (
    <MuiPagination
      page={pageNumber}
      count={totalPages}
      renderItem={(item) => {
        const to = (() => {
          if (Number(item.page) < 1) {
            return "/"
          }
          if (Number(item.page) > totalPages) {
            return `/`
          }
          if (dir === '' ) {
            return item.page === 1 ? `/` : `/${item.page}`
          } else {
            return item.page === 1 ? `/${dir}` : `/${dir}/${item.page}`
          }
        })()
        return (
          <Link href={to}
            passHref
          >
            <MuiPaginationItem
              {...item}
              component={"a"}
              disabled={pageNumber === item.page ? true : item.disabled}
            />
          </Link>
          )        
      }
      }
    />
  );
}

export default Pagination
