/* eslint-disable @next/next/no-img-element */
'use client'
import { Order } from '@/gql/graphql';
import { Button, Modal, Text } from '@shopify/polaris';
import moment from 'moment';
import React, { useCallback, useRef, useState } from 'react';
import './style.css';
import { useSetting } from '@/service/useSettingProvider';
import { useReactToPrint } from 'react-to-print';
import { config_app } from '@/lib/config_app';

interface Props {
  order?: Order | null
  subtotal?: string;
  vat?: string;
  total?: string;
  kitchen?: boolean;
}

function formatKHR(value: number) {
  const formatter = new Intl.NumberFormat('km-Kh', {
    style: 'currency',
    currency: 'KHR',
    currencySign: 'standard',
    currencyDisplay: 'narrowSymbol'
  })

  return formatter.format(value)
}

export function PrintOrder(props: Props) {
  const contentToPrint = useRef(null);
  const setting = useSetting();
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const activator = <Button size='micro' onClick={toggleOpen}>{props.kitchen ? 'Print to Kitchen' : 'Print Recipt'}</Button>

  const created_date = props.order ? props.order?.log?.find(f => f?.text === 'Created')?.date : ''
  const last_date = props.order ? props.order?.log?.find(f => f?.text === 'Last Updated')?.date : ''
  const verify_date = props.order ? props.order?.log?.find(f => f?.text === 'Verifed')?.by?.display : ''
  const exchangeRate = setting.find(f => f.option === 'EXCHANGE_RATE')?.value;
  const vat = setting.find(f => f.option === 'TAX')?.value;

  if (process.browser) {
    navigator.geolocation.getCurrentPosition(msg => {

    })
  }

  return (
    <Modal open={open} onClose={toggleOpen} activator={activator} title={props.kitchen ? 'Print to Kitchen' : 'Print Recipt'} size='small' primaryAction={{
      content: 'Print',
      onAction: () => {
        handlePrint(null, () => contentToPrint.current)
      }
    }}>
      <Modal.Section flush>
        <div className='text-center font-["Lato"] p-2' ref={contentToPrint}>
          <div className='w-full flex flex-row justify-center'>
            <img src={config_app.public.assets.logo} alt='' style={{ width: 60, height: 60, objectFit: 'cover' }} />
          </div>
          <br />
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col items-start'>
              <p className='flex flex-row items-center justify-end'>
                <div>Invoice</div>
                <div className='mx-1'>:</div>
                <div className='text-end'>#{props.order?.id}</div>
              </p>
              <p className='flex flex-row items-center justify-end'>
                <div>Table</div>
                <div className='mx-1'>:</div>
                <div className='text-end'>{props.order?.set}</div>
              </p>
              <p className='flex flex-row items-center justify-between'>
                <div>Cashier</div>
                <div className='mx-2'>:</div>
                <div className='text-end'>{verify_date || ''}</div>
              </p>
            </div>
            <div>
              <p className='flex flex-row items-center justify-between'>
                <div>In</div>
                <div className='mx-2'>:</div>
                <div className='text-right'>{moment(new Date(created_date + "")).format('LTS')}</div>
              </p>
              <p className='flex flex-row items-center justify-between'>
                <div>Out</div>
                <div className='mx-2'>:</div>
                <div className='text-end'>{moment(new Date(last_date + "")).format('LTS')}</div>
              </p>
              <p className='flex flex-row items-center justify-between'>
                <div>Date</div>
                <div className='mx-2'>:</div>
                <div className='text-end'>{moment(new Date(created_date + "")).format('DD-MMM-YYYY')}</div>
              </p>
            </div>
          </div>
          <div>
            <table>
              <thead>
                {props.kitchen ? <tr>
                  <th>Item</th>
                  <th className='text-right'>Qty</th>
                  <th className='text-right'>Addons</th>
                  <th className='text-right'>Note</th>
                </tr> : <tr>
                  <th>Item</th>
                  <th className='text-right'>Qty</th>
                  <th className='text-right'>Price</th>
                  <th className='text-right'>Dis</th>
                  <th className='text-right'>Amount</th>
                </tr>}
              </thead>
              <tbody>
                {
                  props.order?.items?.map((x, i) => {
                    const disPrice = Number(x?.price) * (Number(x?.discount) / 100);
                    const amount = Number(x?.qty) * (Number(x?.price) - Number(disPrice))
                    if (props.kitchen) {
                      return (
                        <tr key={i}>
                          <td className='text-start'>{i + 1}. {x?.product?.title} ({x?.sku?.name})</td>
                          <td className='text-right'>{x?.qty}</td>
                          <td className='text-right'>{x?.addons}</td>
                          <td className='text-right'>{x?.remark}</td>
                        </tr>
                      )
                    }
                    return (
                      <tr key={i}>
                        <td className='text-start'>{i + 1}. {x?.product?.title}</td>
                        <td className='text-right'>{x?.qty}</td>
                        <td className='text-right'>${x?.price?.toFixed(2)}</td>
                        <td className='text-right'>${disPrice.toFixed(2)} ({x?.discount?.toFixed(2)}%)</td>
                        <td className='text-right'>${amount.toFixed(2)}</td>
                      </tr>
                    )
                  })
                }
                {!props.kitchen && <tr>
                  <td colSpan={2} className='text-right border-none'>
                    <div className='flex flex-col justify-between'>
                      <div className='h-8'>Sub Total</div>
                      <div className='h-8'>VAT <span>({vat}%)</span></div>
                      <div className='h-8'>TOTAL</div>
                    </div>
                  </td>
                  <td colSpan={2} suppressHydrationWarning className='text-right border-none'>
                    <div className='flex flex-col justify-between'>
                      <div className='h-8'>{formatKHR(Math.round(Number(exchangeRate) * Number(props.subtotal)))}</div>
                      <div className='h-8'></div>
                      <div className='font-bold h-8' style={{ marginLeft: '20%' }}>{formatKHR(Math.round(Number(exchangeRate) * Number(props.total)))}</div>
                    </div>
                  </td>
                  <td className='text-right border-none'>
                    <div className='flex flex-col justify-between'>
                      <div className='h-8'>${Number(props.subtotal).toFixed(2)}</div>
                      <div className='h-8'>${Number(props.vat).toFixed(2)}</div>
                      <div className='h-8'>${Number(props.total).toFixed(2)}</div>
                    </div>
                  </td>
                </tr>}
              </tbody>
            </table>
            <div>
              {/* <div className='flex flex-row justify-between items-center mb-2'>
                <div className='text-right' style={{ width: 197, paddingRight: 10 }}>Sub Total</div>
                <div><div className='text-right'>{Math.round(Number(exchangeRate) * Number(props.subtotal))} ៛</div></div>
                <div className='w-[100px] text-right'>${Number(props.subtotal).toFixed(2)}</div>
              </div>
              <div className='flex flex-row justify-between items-center mb-2'>
                <div className='text-right' style={{ width: 205, paddingRight: 10 }}>VAT ({vat}%)</div>
                <div></div>
                <div className='mr-2 w-[100px] text-right' >${Number(props.vat).toFixed(2)}</div>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='text-right font-bold' style={{ width: 205 }}>TOTAL</div>
                <div className='text-right font-bold w-[200px]' style={{ marginLeft: '20%' }}>{Math.round(Number(exchangeRate) * Number(props.total))} ៛</div>
                <div className='mr-2 font-bold w-[100px] text-right'>${Number(props.total).toFixed(2)}</div>
              </div> */}
            </div>
          </div>
        </div>
      </Modal.Section>
    </Modal>
  )
}