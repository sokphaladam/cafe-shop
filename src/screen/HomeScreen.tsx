'use client';
import { Telegram } from '@/api/telegram';
import { ProductList } from '@/components/ProductList';
import { Topbar } from '@/components/Topbar';
import { ProviderOrderContext } from '@/context/OrderContext';
import React, { useEffect, useState } from 'react';

export function HomeScreen() {
  const [checkStatus, setCheckStatus] = useState(null);
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const telegram = new Telegram();
    telegram.getMe().then(res => {
      setCheckStatus(res.ok);
      setInfo(res.result);
    });
  }, [])

  const handleSendTest = () => {
    const img = 'https://www.milesteaandcoffee.com/userfiles/files/Espresso.jpg'
    if (info) {
      const text = `<span class="tg-spoiler">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler><code>inline fixed-width code</code>`
      const telegram = new Telegram();
      telegram.sendMessage(text).then(res => {
        if (!!res.ok) {
          alert(`Test send to ${info.username}`)
        }
      })
    }
  }

  return (
    <ProviderOrderContext>
      {checkStatus === null && <div className='bg-gray-100 p-1 text-gray-500 text-center'>Wait a moment...</div>}
      {/* <div onClick={handleSendTest}>Test send</div> */}
      {checkStatus === true && (
        <>
          <Topbar />
          <br />
          <ProductList />
        </>)
      }
    </ProviderOrderContext >
  )
}