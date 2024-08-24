'use client'
import { Order, StatusOrder } from '@/gql/graphql';
import { ActionList, Badge, Icon, IndexTable, Popover, Text, Thumbnail, Tooltip } from '@shopify/polaris';
import { InfoIcon, CheckCircleIcon, DeliveryIcon, ClipboardCheckFilledIcon, XCircleIcon, MenuVerticalIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

interface Props {
  item: Order | null
}

const toneStatus: any = {
  [StatusOrder.Pending]: "attention-strong",
  [StatusOrder.Verify]: "info-strong",
  [StatusOrder.Delivery]: "success",
  [StatusOrder.Checkout]: "success-strong",
  [StatusOrder.Cancelled]: "critical-strong"
}

const toneIcon: any = {
  [StatusOrder.Pending]: InfoIcon,
  [StatusOrder.Verify]: CheckCircleIcon,
  [StatusOrder.Delivery]: DeliveryIcon,
  [StatusOrder.Checkout]: ClipboardCheckFilledIcon,
  [StatusOrder.Cancelled]: XCircleIcon
}

export function OrderListItem({ item }: Props) {

  const [open, setOpen] = useState(false);

  const toggelOpen = useCallback(() => setOpen(!open), [open])

  const total = Number(item?.total || 0) > 0 ? item?.total : item?.items?.reduce((a: any, b: any) => {
    const dis_price = Number(b.price) * (Number(b.discount) / 100);
    const amount = Number(b.qty) * (Number(b.price) - dis_price);
    return (a = a + amount);
  }, 0)

  const text = item?.items?.filter((_, i) => i > 4).map((x) => x?.product?.title + " x" + x?.qty).join(',');

  return (
    <IndexTable.Row id={item?.id + ""} position={item?.id || 0}>
      <IndexTable.Cell>
        <Text as='p' variant='bodySm'>#{item?.id}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell className='text-center'>
        {/* <Text as='p' variant='bodySm' alignment='center'>{item?.items?.length}</Text> */}
        <div className='flex flex-row items-center'>
          {
            item?.items?.map((x, i) => {
              if (i > 4) return <></>
              return (
                <div key={x?.id} className='mx-1'>
                  <Tooltip content={x?.product?.title + " x" + x?.qty}>
                    <Thumbnail alt='' source={x?.product?.images || ''} size='small' />
                  </Tooltip>
                </div>
              )
            })
          }
          {
            (item?.items?.length || 0) > 4 &&
            <Tooltip content={text}><div className='mx-1 font-bold cursor-pointer'>+{Number(item?.items?.length || 0) - 4}</div></Tooltip>
          }
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell className='text-center'>
        <div className='flex flex-row justify-center'>
          <Badge tone={toneStatus[item?.status || '']} icon={toneIcon[item?.status || ""]} size='small'>
            {
              <small>{item?.status || ''}</small> as any
            }
          </Badge>
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as='p' variant='bodyMd' fontWeight='bold' tone='base' alignment='end'>{Number(item?.items?.reduce((a, b) => a = a + Number(b?.qty || 0), 0))}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell className='text-end'>
        <Text as='p' variant='bodyMd' fontWeight='bold' tone='success' alignment='end'>$ {Number(total).toFixed(2)}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell className='text-end'>
        <Text as='p' variant='bodyMd' fontWeight='bold' tone='critical' alignment='end'>$ {Number(item?.paid).toFixed(2)}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <div className='w-[100px]'>
          <Tooltip content={item?.note}>
            <Text as='p' variant='bodySm' truncate>{item?.note}</Text>
          </Tooltip>
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell className='text-center'>
        <div className='flex flex-row justify-end'>
          <Popover activator={<div className='cursor-pointer hover:bg-gray-300 rounded-full w-[30px] h-[30px] flex flex-row items-center' onClick={toggelOpen}><Icon source={MenuVerticalIcon} tone='base' /></div>} active={open} onClose={toggelOpen}>
            <ActionList
              items={[
                { content: 'Verify' },
                { content: 'Delivery' },
                { content: 'Checkout' },
                { content: 'Cancel' },
              ]}
            />
          </Popover>
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  )
}