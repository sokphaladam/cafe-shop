import react, { useState } from 'react';

export function usePagination() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState<25 | 50 | 75 | 100>(25);

  return {
    offset, setOffset, limit, setLimit
  }
}