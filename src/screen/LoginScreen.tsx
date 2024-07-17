'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { setCookie } from "cookies-next";
import { useCustomToast } from '@/components/custom/CustomToast';
import { Telegram } from '@/api/telegram';
import moment from 'moment';

export function LoginScreen() {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const { toasts, setToasts } = useCustomToast();
  const [checkStatus, setCheckStatus] = useState(null);

  useEffect(() => {
    const telegram = new Telegram();
    telegram.getMe().then(res => {
      setCheckStatus(res.ok);
    });
  }, [])

  const handleClick = useCallback(async () => {
    setToasts([...toasts, {
      content: 'Welcome!',
      status: 'success'
    }]);
    const telegram = new Telegram();
    const str = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    telegram.sendMessage(`<code>Staff login ${str}</code>`)
    setCookie('tk_token', 'TK' + new Date().toTimeString())
    await sleep(1);
    process.browser && window.location.reload();
  }, [setToasts, toasts]);

  return (
    <div className='w-full h-[100vh] bg-gray-100 items-center flex justify-center'>
      {checkStatus === null && <div className='bg-gray-100 p-1 text-gray-500 text-center'>Wait a moment...</div>}
      <div className='bg-white rounded-md w-[520px] max-sm:w-full px-5 py-3'>
        {/* <h4>Login</h4> */}
        <button className='bg-blue-400 text-blue-100 px-3 py-1 rounded-md' onClick={handleClick}>Login</button>
      </div>
    </div>
  )
}