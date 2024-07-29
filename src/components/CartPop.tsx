/* eslint-disable @next/next/no-img-element */
import { Telegram } from '@/api/telegram';
import { useOrderContext } from '@/context/OrderContext';
import React, { useCallback, useState } from 'react';
import { useCustomToast } from './custom/CustomToast';
import { Icon } from '@shopify/polaris';
import { CartFilledIcon, CartIcon } from '@shopify/polaris-icons';

export function CartPop() {
  const { setToasts, toasts } = useCustomToast();
  const { items, setItems } = useOrderContext();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);

  const handleCheckout = useCallback(() => {
    const telegram = new Telegram();

    let text = `<b>Order Number: ${count}</b>%0A%0A`

    if (items) {
      for (let i = 0; i < (items || []).length; i++) {
        text = text + `${i + 1}.${items[i].name} <code>📓${items[i].code}</code> ✅${items[i].qty} 💲${Number(items[i].price).toFixed(2)}/1Qty.%0A`
      }
      text = text + `%0A%0A<b>Total: 💲${Number(items?.reduce((a, b) => a = a + (b.price * b.qty), 0)).toFixed(2)}</b>`
    }

    telegram.sendMessage(text).then(res => {
      console.log(res)
      setItems && setItems([]);
      setCount(count === 100 ? 0 : count + 1);
      setShow(false);
    }).catch(err => console.log(err));

    setToasts([
      ...toasts, {
        content: `Checkout order #${count}.`,
        status: 'success'
      }
    ])

  }, [count, items, setItems, setToasts, toasts])

  const handleRemove = useCallback((i: number) => {
    const dummy = (items || []).filter((_, index) => index !== i);
    setItems && setItems(dummy)
    if (dummy.length === 0) {
      setShow(false)
    }
  }, [items, setItems])

  return (
    <React.Fragment>
      <div className='w-[25px] cursor-pointer h-[25px] flex flex-row self-center relative'
      // onClick={() => {
      //   if ((items || []).length > 0) {
      //     setShow(!show)
      //   }
      // }}
      >
        <Icon source={CartFilledIcon} tone='base' />
        {
          items && items.length > 0 && (
            <span
              className='absolute cursor-pointer top-[-10px] left-[-10px] inline-flex items-center rounded-full bg-red-400 px-1 py-[2px] text-xs font-medium text-red-100 ring-1 ring-inset ring-pink-700/10'
            >{items.reduce((a, b) => a = a + b.qty, 0)}</span>
          )
        }
      </div>
      {
        show === true && <div className='fixed bottom-0 w-full left-0 right-0'>
          <div className='relative w-[512px] mx-auto bg-white rounded-md p-4 shadow-md max-md:w-[512/2] max-sm:w-full'>
            <div className='p-1 font-bold'>
              <h4>Order Carts</h4>
            </div>
            <hr />
            {
              items?.map((x, i) => {
                return (
                  <div key={i} className='p-1 border-b flex flex-row justify-between align-middle'>
                    <div className='flex flex-row w-[50%]'>
                      <img src={x.img} alt="" className='w-[50px] h-[50px] object-cover aspect-square' />
                      <div className='ml-3'>
                        <div className='text-base text-slate-500 truncate'>{x.name}</div>
                        <div className='text-lg font-bold text-gray-800'>${Number(x.price).toFixed(2)}</div>
                      </div>
                    </div>
                    <div className='flex flex-row align-middle self-center w-[25%]'>
                      <div
                        className='p-2 bg-slate-200 rounded-md'
                        onClick={() => {
                          const data = [...items]
                          data[i].qty = data[i].qty - 1;
                          if (data[i].qty === 0) {
                            setItems && setItems(data.filter(f => f.qty > 0))
                          }
                          else {
                            setItems && setItems(data)
                          }
                        }}
                      >-</div>
                      <div className='p-2 rounded-md w-[100px] text-center'>{x.qty}</div>
                      <div
                        className='p-2 bg-slate-200 rounded-md'
                        onClick={() => {
                          const data = [...items]
                          data[i].qty = data[i].qty + 1;
                          setItems && setItems(data)
                        }}
                      >+</div>
                    </div>
                    <div className='flex flex-row align-middle self-center w-[25%] justify-end'>
                      <div
                        className='bg-red-500 p-1 rounded-md text-red-200'
                        onClick={() => handleRemove(i)}
                      >Remove</div>
                    </div>
                  </div>
                )
              })
            }
            <div className='pt-2 flex flex-row justify-between self-end'>
              <div className='pl-1'>
                <h4 className='text-lg font-bold'>Total: <span className='ml-2'>${Number(items?.reduce((a, b) => a = a + (b.price * b.qty), 0)).toFixed(2)}</span></h4>
              </div>
              <button className='bg-green-500 text-green-200 p-1 rounded-md text-sm' onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  )
}