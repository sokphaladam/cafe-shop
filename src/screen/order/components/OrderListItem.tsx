'use client'
import { useCustomToast } from '@/components/custom/CustomToast';
import { Order, StatusOrder, StatusOrderItem, useChangeOrderStatusMutation } from '@/gql/graphql';
import { Modal } from '@/hook/modal';
import { ActionList, Badge, Icon, IndexTable, Popover, Text, Thumbnail, Tooltip, Modal as Modals, TextField, ActionListItemDescriptor } from '@shopify/polaris';
import { MenuVerticalIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';
import { LogStatus } from './LogStatus';
import Link from 'next/link';
import { useSetting } from '@/service/useSettingProvider';

interface Props {
  item: Order | null
}

export function OrderListItem({ item }: Props) {
  const { setToasts, toasts } = useCustomToast();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [reasonInput, setReasonInput] = useState('');

  const toggelOpen = useCallback(() => setOpen(!open), [open])
  const toggleActive = useCallback(() => setActive(!active), [active])

  const [change] = useChangeOrderStatusMutation({
    refetchQueries: ['order', 'orderList']
  });

  const handleUpdate = useCallback((status: StatusOrder) => {
    toggelOpen();
    if (status === StatusOrder.Cancelled) {
      toggleActive();
    }
    else {
      Modal.dialog({
        title: 'Confirmation',
        body: [
          <div key={1}>You are select order <b>#{item?.id}</b> to <b>{status.toLowerCase()}</b>.</div>
        ],
        buttons: [
          { title: 'No', },
          {
            title: 'Yes', class: 'primary', onPress: () => {
              change({
                variables: {
                  data: {
                    orderId: Number(item?.id),
                    status,
                  }
                }
              }).then(res => {
                if (res.data?.changeOrderStatus) {
                  setToasts([...toasts, { content: 'Update status was success.', status: 'success' }])
                }
                else {
                  setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }])
                }
              }).catch(() => {
                setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }])
              })
            }
          },
        ]
      })
    }
  }, [change, item?.id, setToasts, toasts, toggelOpen, toggleActive])

  let menus: ActionListItemDescriptor[] = []

  switch (item?.status) {
    case StatusOrder.Pending:
      menus = [
        { content: 'Verify', onAction: () => handleUpdate(StatusOrder.Verify) },
        { content: 'Cancel', onAction: () => handleUpdate(StatusOrder.Cancelled) },
      ]
      break;
    case StatusOrder.Verify:
      menus = [
        { content: 'Delivery', onAction: () => handleUpdate(StatusOrder.Delivery) },
        { content: 'Cancel', onAction: () => handleUpdate(StatusOrder.Cancelled) },
      ]
      break;
    case StatusOrder.Delivery:
      menus = [
        { content: 'Checkout', onAction: () => handleUpdate(StatusOrder.Checkout) },
        { content: 'Cancel', onAction: () => handleUpdate(StatusOrder.Cancelled) },
      ]
      break;
    case StatusOrder.Checkout:
      menus = [
        { content: 'Cancel', onAction: () => handleUpdate(StatusOrder.Cancelled) }
      ]
      break;
    case StatusOrder.Cancelled:
      break;
    default:
      //
      break;
  }

  const total = item?.items?.reduce((a: any, b: any) => {
    const dis_price = Number(b.price) * (Number(b.discount) / 100);
    const amount = Number(b.qty) * (Number(b.price) - dis_price);
    return (a = a + amount);
  }, 0);

  const vatPer = item?.vat || '0';
  const vat = total * Number(vatPer || 0) / 100;

  const totalAfterVat = total + vat

  const text = item?.items?.filter((_, i) => i > 2).map((x) => x?.product?.title + " x" + x?.qty).join(',');

  return (
    <React.Fragment>
      <Modals
        open={active}
        onClose={toggleActive}
        title={`Cancel Order #${item?.id}`}
        primaryAction={{
          content: "Cancel",
          destructive: true,
          onAction: () => {
            if (!reasonInput) {
              setToasts([...toasts, { content: 'Please input the reason!', status: 'error' }])
              return;
            }
            change({
              variables: {
                data: {
                  orderId: Number(item?.id),
                  status: StatusOrder.Cancelled,
                  reason: reasonInput,
                }
              }
            }).then(res => {
              if (res.data?.changeOrderStatus) {
                setToasts([...toasts, { content: 'Update status was success.', status: 'success' }])
                setReasonInput('')
                toggleActive()
              }
              else {
                setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }])
              }
            }).catch(() => {
              setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }])
            })
          }

        }}
      >
        <Modals.Section>
          <TextField
            autoComplete='off'
            label="Why do you want to cancel the order?"
            multiline={5}
            placeholder='Please give me a reason...'
            value={reasonInput}
            onChange={setReasonInput}
            requiredIndicator
          />
        </Modals.Section>
      </Modals>
      <IndexTable.Row id={item?.id + ""} position={item?.id || 0}>
        <IndexTable.Cell>
          <Link href={`/order/detail/${item?.id}`}>
            <Text as='p' variant='bodySm'>#{item?.id}</Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell className='text-center'>
          {/* <Text as='p' variant='bodySm' alignment='center'>{item?.items?.length}</Text> */}
          <div className='flex flex-row items-center'>
            {
              item?.items?.map((x, i) => {
                if (i > 2) return <></>
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
              <Tooltip content={text}><div className='mx-1 font-bold cursor-pointer'>+{Number(item?.items?.length || 0) - 3}</div></Tooltip>
            }
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as='p' variant='bodySm' tone='base'>Set: {Number(item?.set) < 10 ? '0' + item?.set : item?.set} ({item?.code})</Text>
        </IndexTable.Cell>
        <IndexTable.Cell className='text-center'>
          <div className='flex flex-row justify-center'>
            <LogStatus item={item} />
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as='p' variant='bodySm' tone='base' alignment='end'>{Number(item?.items?.reduce((a, b) => a = a + Number(b?.qty || 0), 0))}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell className='text-end'>
          <Text as='p' variant='bodySm' tone='base' alignment='end'>$ {Number(total).toFixed(2)}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell className='text-end'>
          <Text as='p' variant='bodySm' tone='base' alignment='end'>$ {Number(vat).toFixed(2)} ({vatPer || 0}%)</Text>
        </IndexTable.Cell>
        <IndexTable.Cell className='text-end'>
          <Text as='p' variant='bodyMd' fontWeight='bold' tone='success' alignment='end'>$ {Number(totalAfterVat).toFixed(2)}</Text>
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
                items={menus}
              />
            </Popover>
          </div>
        </IndexTable.Cell>
      </IndexTable.Row>
    </React.Fragment>
  )
}