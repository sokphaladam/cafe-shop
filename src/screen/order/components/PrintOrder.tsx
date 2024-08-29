'use client'
import { Order } from '@/gql/graphql';
import { Button, Modal, Text } from '@shopify/polaris';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import './style.css';
import { verify } from 'crypto';
import { useSetting } from '@/service/useSettingProvider';

interface Props {
  order?: Order | null
  subtotal?: string;
  vat?: string;
  total?: string;
}

export function PrintOrder(props: Props){
  const setting = useSetting();
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const activator = <Button size='micro' onClick={toggleOpen}>Print Recipt</Button>

  const created_date = props.order ? props.order?.log?.find(f => f?.text === 'Created')?.date : ''
  const last_date = props.order ? props.order?.log?.find(f => f?.text === 'Last Updated')?.date : ''
  const verify_date = props.order ? props.order?.log?.find(f => f?.text === 'Verifed')?.by?.display : ''
  const exchangeRate = setting.find(f => f.option === 'EXCHANGE_RATE')?.value;
  const vat = setting.find(f => f.option === 'TAX')?.value;

  console.log(navigator.geolocation.getCurrentPosition(msg => console.log(msg)))

  return (
    <Modal open={open} onClose={toggleOpen} activator={activator} title="Print Reciept" size='small'>
      <Modal.Section>
        <div className='text-center font-["Lato"]'>
          <Text as='h4' variant='headingLg' fontWeight='bold'>Mood</Text>
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
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Dis</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  props.order?.items?.map((x, i) => {
                    const disPrice = Number(x?.price) * (Number(x?.discount)/100);
                    const amount = Number(x?.qty) * ( Number(x?.price) - Number(disPrice))
                    return (
                      <tr key={i}>
                        <td className='text-start'>{i+1}. {x?.product?.title}</td>
                        <td>{x?.qty}</td>
                        <td>${x?.price?.toFixed(2)}</td>
                        <td>${disPrice.toFixed(2)} ({x?.discount?.toFixed(2)}%)</td>
                        <td>${amount.toFixed(2)}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div>
            
            <div className='flex flex-row justify-between items-center mb-2'>
                <div className='text-right' style={{ width: 197, paddingRight:10 }}>Sub Total</div>
                <div><div className='text-right'>{Math.round(Number(exchangeRate) * Number(props.subtotal))} ៛</div></div>
                <div className='w-[100px] text-right'>${Number(props.subtotal).toFixed(2)}</div>
              </div>
              <div className='flex flex-row justify-between items-center mb-2'>
                <div className='text-right' style={{ width: 205, paddingRight:10 }}>VAT ({vat}%)</div>
                <div></div>
                <div className='mr-2 w-[100px] text-right' >${Number(props.vat).toFixed(2)}</div>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='text-right font-bold' style={{ width: 205 }}>TOTAL</div>
                <div className='text-right font-bold w-[200px]' style={{  marginLeft: '20%'}}>{Math.round(Number(exchangeRate) * Number(props.total))} ៛</div>
                <div className='mr-2 font-bold w-[100px] text-right'>${Number(props.total).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Section>
    </Modal>
  )
}