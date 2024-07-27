import React from 'react';
import { CartPop } from './CartPop';
import Image from 'next/image';
import useLongPress from '@/hook/useLongPress';
import { useRouter } from 'next/navigation';
import { config_app } from '@/lib/config_app';

export function Topbar() {
  const { push } = useRouter();
  const handleLogPress = () => {
    console.log('long press')
    push('/login')
  }

  const handleClick = () => {

  }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 1000,
  };

  const logPressEvent = useLongPress(handleLogPress, handleClick, defaultOptions);

  return (
    <div className='bg-white px-4 py-2 sticky top-0 left-0 right-0 min-h-10 z-50'>
      <div className='max-w-[1200px] mx-auto flex flex-row align-middle justify-between align-middle'>
        <Image src={config_app.public.assets.logo} width={45} height={45} alt="" className='w-8 h-auto object-contain' {...logPressEvent} />
        <div className='flex flex-row'>
          <CartPop />
        </div>
      </div>
    </div>
  )
}