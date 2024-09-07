'use client';

import { useOrderContext } from '@/context/OrderContext';

export function DisplayOrder() {
  const { order } = useOrderContext();

  if (!order) {
    return <></>;
  }

  const date = order ? order.log.find((f: any) => f.text === 'Created').date : '';

  return (
    <div className="px-1 font-bold">
      <div>TABLE: #{order.set}</div>
      <div>Order Date: {date}</div>
    </div>
  );
}
