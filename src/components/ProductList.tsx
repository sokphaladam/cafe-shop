import { useOrderContext } from '@/context/OrderContext';
import React, { useCallback, useState } from 'react';
import { useCustomToast } from './custom/CustomToast';

const dummy = [
  {
    name: 'Espresso',
    img: 'https://img.freepik.com/free-vector/realistic-cup-black-brewed-coffee-saucer-vector-illustration_1284-66002.jpg?w=826&t=st=1720954686~exp=1720955286~hmac=c100e7640ecb2938d1d676596c621abb9724187cc554cf6af515efe0cfb3a789',
    price: 1.5,
  },
  {
    name: 'Hot Tea',
    img: 'https://img.freepik.com/free-photo/beautiful-still-life-tea_23-2148174200.jpg?t=st=1720954738~exp=1720958338~hmac=1980fcbf7e8c5254e3b08503cf665612a644bc3a09d3f88c3472e798adfe6214&w=826',
    price: 1.5,
  },
  {
    name: 'Coffee Package',
    img: 'https://img.freepik.com/premium-psd/coffee-pouch-branding-design-showcase_690834-2843.jpg?w=1380',
    price: 5.6,
  },
  {
    name: 'Coffee Tumber',
    img: 'https://img.freepik.com/premium-psd/tumbler-coffee-mockup_609550-472.jpg?w=1380',
    price: 2.8,
  },
  {
    name: 'Coffee Paper',
    img: 'https://img.freepik.com/premium-psd/coffee-paper-cup-mockup_979395-14.jpg?w=1380',
    price: 1.25,
  },
  {
    name: 'Bubble tea',
    img: 'https://img.freepik.com/premium-psd/bubble-tea-beverage-container-mock-up-design_23-2150073425.jpg?w=740',
    price: 3.0,
  },
  {
    name: 'Bubble Light',
    img: 'https://img.freepik.com/premium-psd/bubble-tea-beverage-container-mock-up-design_23-2150073469.jpg?w=740',
    price: 3.0,
  },
  {
    name: 'Caffee tea',
    img: 'https://img.freepik.com/premium-psd/bubble-tea-beverage-container-mock-up-design_23-2150073449.jpg?w=740',
    price: 2.25,
  },
  {
    name: 'Bubble vanila',
    img: 'https://img.freepik.com/premium-psd/bubble-tea-beverage-container-mock-up-design_23-2150073441.jpg?w=740',
    price: 3.0,
  },
  {
    name: 'Black cafe & bubble',
    img: 'https://img.freepik.com/premium-psd/bubble-tea-beverage-container-mock-up-design_23-2150073445.jpg?w=740',
    price: 3.5,
  },
  {
    name: 'Orange tea',
    img: 'https://img.freepik.com/premium-psd/bubble-tea-beverage-container-mock-up-design_23-2150073389.jpg?w=740',
    price: 1.5,
  },
  {
    name: 'Caffee Package M',
    img: 'https://img.freepik.com/premium-psd/coffee-beans-pouch-mockup_23-2150745507.jpg?w=740',
    price: 6,
  },
];

export function ProductList() {
  const { toasts, setToasts } = useCustomToast();
  const { items, setItems } = useOrderContext();

  const handleClickToCart = useCallback(
    (item: any) => {
      const data = [...(items || [])];
      const index = data.findIndex((f) => f.code === item.code);

      if (index >= 0) {
        data[index].qty = data[index].qty + 1;
      } else {
        data.push({
          ...item,
          qty: 1,
        });
      }
      setItems && setItems(data);
      setToasts([
        ...toasts,
        {
          content: `Add ${item.name} to cart`,
          status: 'info',
        },
      ]);
    },
    [items, setItems, setToasts, toasts],
  );

  return (
    <div className="p-5 max-w-[1200px] my-0 mx-auto bg-white rounded-md">
      <div className="grid gap-4 grid-cols-6 max-sm:grid-cols-2 max-md:grid-cols-4 max-lg:grid-cols-4">
        {dummy.map((_, i) => {
          return (
            <div
              onClick={() => handleClickToCart({ ..._, code: `CA${i + 1}` })}
              className="w-fit h-[300px] cursor-pointer rounded-md shadow-md relative overflow-hidden hover:bg-slate-200 transition-all duration-75"
              key={i}
            >
              <div className="w-full">
                <img
                  src={i > dummy.length - 1 ? dummy[i - 12].img : dummy[i].img}
                  alt=""
                  className="w-fit h-[225px] aspect-square object-cover rounded-md border-collapse border-gray-200 border-[0.5px]"
                />
              </div>
              <div className="min-h-8 p-3 ">
                <div className="flex flex-row justify-between align-middle">
                  <div className="text-lg font-bold text-gray-800">
                    ${i > dummy.length - 1 ? dummy[i - 12].price : dummy[i].price}
                  </div>{' '}
                  <div className="text-xs text-slate-500 flex flex-row self-center">#CA{i + 1}</div>
                </div>
                <div className="text-base text-slate-500 truncate">
                  {i > dummy.length - 1 ? dummy[i - 12].name : dummy[i].name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
