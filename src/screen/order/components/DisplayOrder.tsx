'use client';

import { useOrderContext } from '@/context/OrderContext';
import { useSetting } from '@/service/useSettingProvider';

export function DisplayOrder() {
  const { order } = useOrderContext();
  const setting = useSetting();

  if (!order) {
    return <></>;
  }

  const date = order ? order.log.find((f: any) => f.text === 'Created').date : '';

  const wifi = setting.find((f) => f.option === 'GUEST_WIFI')?.value;

  return (
    <div className="px-1 font-bold">
      <div>TABLE: #{order.set}</div>
      <div>Order Date: {date}</div>
      <div>Wifi: GUEST WIFI</div>
      <div>Password: {wifi}</div>
    </div>
  );
}
