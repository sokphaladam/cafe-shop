/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { CartPop } from './CartPop';
import useLongPress from '@/hook/useLongPress';
import { useRouter } from 'next/navigation';
import { config_app } from '@/lib/config_app';

export function Topbar({ isCart }: { isCart: boolean }) {
  const { push } = useRouter();
  const handleLogPress = () => {
    console.log('long press');
    push('/login');
  };

  const handleClick = () => {};

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 1000,
  };

  const logPressEvent = useLongPress(handleLogPress, handleClick, defaultOptions);

  return (
    <div className="bg-white px-4 py-2 sticky top-0 left-0 right-0 min-h-10 z-50 max-h-10">
      <div className="max-w-[1200px] mx-auto flex flex-row align-middle justify-end max-sm:w-[100%] relative">
        <img
          src={config_app.public.assets.logo}
          alt=""
          className="w-14 h-auto left-0 absolute object-contain"
          {...logPressEvent}
        />
        <div className="flex flex-row">{isCart && <CartPop />}</div>
      </div>
    </div>
  );
}
