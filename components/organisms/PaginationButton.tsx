import * as React from 'react';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

type Props = {
  pageNumber: number
  totalCount: number
}

export const PER_PAGE = 10

const Content = ({ pageNumber, totalCount }: Props) => {
  return (
    <Pagination
      page={pageNumber}
      count={Math.ceil(totalCount/PER_PAGE)}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={item.page === 1 ? '' : `/blog/page/${item.page}`}
          {...item}
        />
      )}
    />
  );
}

export default function PaginationButton({ pageNumber, totalCount }: Props) {
  return (
    <MemoryRouter initialEntries={['']} initialIndex={1}>
      <Routes>
        <Route path="*" element={<Content pageNumber={pageNumber} totalCount={totalCount} />} />
      </Routes>
    </MemoryRouter>
  );
}