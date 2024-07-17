import React, { useCallback } from 'react';
import { CartPop } from './CartPop';
import { useCustomToast } from './custom/CustomToast';
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Telegram } from '@/api/telegram';
import moment from 'moment';

export function Topbar() {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const { toasts, setToasts } = useCustomToast();
  const { push } = useRouter();

  const handleLogout = useCallback(async () => {
    await deleteCookie('tk_token');
    await push('/');
    await sleep(1);
    setToasts([...toasts, {
      content: 'Logout!',
      status: 'success'
    }]);
    const telegram = new Telegram();
    const str = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    telegram.sendMessage(`<code>Staff Logout ${str}</code>`)
    process.browser && window.location.reload();
  }, [push, setToasts, toasts])

  return (
    <div className='bg-white px-4 py-2 sticky top-0 left-0 right-0 min-h-10 z-50'>
      <div className='max-w-[1200px] mx-auto flex flex-row align-middle justify-between align-middle'>
        <img src="https://th.bing.com/th/id/OIP.Opm5M6UUxjTVk7o6J6LMbwHaHa?rs=1&pid=ImgDetMain" alt="" className='w-8 h-auto object-contain' />
        <div className='flex flex-row'>
          <CartPop />
          <div className='cursor-pointer flex flex-row self-center relative hover:bg-gray-200 rounded-lg ml-5 px-2' onClick={handleLogout}>Logout</div>
        </div>
      </div>
    </div>
  )
}