import React, { useEffect, useState } from 'react';

export function usePagination() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState<25 | 50 | 75 | 100>(25);

  useEffect(() => {
    const handleRouteChange = (event: any) => {
      console.log('URL changed to:', event.href);
      setOffset(0);
      setLimit(25);
    };

    process.browser && window.addEventListener('popstate', handleRouteChange);

    return () => {
      process.browser && window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return {
    offset,
    setOffset,
    limit,
    setLimit,
  };
}
