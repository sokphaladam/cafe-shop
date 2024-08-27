/* eslint-disable @next/next/no-img-element */
'use client'
import { useCustomToast } from '@/components/custom/CustomToast';
import { OrderViewBy, StatusOrder, StatusOrderItem, useChangeOrderStatusMutation, useMarkOrderItemStatusMutation, useOrderListQuery, useSubscriptionLoadSubscription } from '@/gql/graphql';
import { Box, Button, Card, Divider, Icon, Layout, Page, Spinner, Text, Thumbnail } from '@shopify/polaris';
import { CheckIcon, XIcon } from '@shopify/polaris-icons';
import React, { useCallback } from 'react';

export function OrderKitchenScreen() {
  const { setToasts, toasts } = useCustomToast();
  const [mark, { loading: loadingMark }] = useMarkOrderItemStatusMutation({
    refetchQueries: ['order', 'orderList']
  })
  const { data, loading, refetch } = useOrderListQuery({
    variables: {
      viewBy: OrderViewBy.Kitchen,
      limit: 25,
      offset: 0,
      status: [StatusOrder.Verify]
    },
  });
  const [change, { loading: loadingChange }] = useChangeOrderStatusMutation({
    refetchQueries: ['order', 'orderList']
  });
  // useSubscriptionLoadSubscription({
  //   onData: (res) => {
  //     refetch();
  //     setToasts([...toasts, { content: res.data.data?.newOrderPending + '', status: 'info' }])
  //   }
  // });

  const handleCancel = useCallback((id: number) => {
    mark({
      variables: {
        markOrderItemStatusId: Number(id),
        status: StatusOrderItem.Deleted
      }
    })
  }, [mark])

  const handleCompleted = useCallback((id: number) => {
    mark({
      variables: {
        markOrderItemStatusId: Number(id),
        status: StatusOrderItem.Completed
      }
    })
  }, [mark])

  const handleUpdate = useCallback((status: StatusOrder, id: number) => {
    change({
      variables: {
        data: {
          orderId: Number(id),
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
  }, [change, setToasts, toasts])

  if (loading || !data) {
    return <></>
  }

  // const itemFirst = data ? data.orderList ? data.orderList[0] : null : null

  // return (
  //   <Page fullWidth>
  //     <div className='grid grid-cols-4 gap-4'>
  //       {
  //         itemFirst && <div className='p-2 bg-rose-300 rounded-md shadow-md'>
  //           <div className='relative'><div className='bg-amber-600 absolute -top-2 p-3'>{itemFirst.set}</div><Text as='h4' variant='headingLg' alignment='center'>#{itemFirst?.id}</Text></div>
  //           <div className='bg-white p-2 rounded-md'>
  //             {
  //               itemFirst.items?.map(x => {
  //                 return (
  //                   <div key={x?.id} className='flex flex-row items-center justify-between'>
  //                     <div className='flex flex-row items-center gap-2'>
  //                       <Thumbnail alt='' source={x?.product?.images + ''} size='small' />
  //                       <Text as='p' variant='bodyMd'>{x?.product?.title}</Text>
  //                     </div>
  //                     <Text as='p' variant='bodyMd'>x{x?.qty}</Text>
  //                   </div>
  //                 )
  //               })
  //             }
  //           </div>
  //         </div>
  //       }
  //       <div className='col-span-3 grid grid-cols-3 gap-4'>
  //         {
  //           data && data.orderList?.filter((_, i) => i > 0).map((order) => {
  //             return (
  //               <div key={order?.id} className='p-2 bg-slate-100 shadow-md rounded-md'>
  //                 <Text as='h4' variant='headingLg' alignment='center'>#{order?.id}</Text>
  //                 <div className='bg-white p-2 rounded-md min-h-48 overflow-auto'>
  //                   {
  //                     order?.items?.map(x => {
  //                       return (
  //                         <div key={x?.id} className='flex flex-row items-center justify-between'>
  //                           <div className='flex flex-row items-center gap-2'>
  //                             <Thumbnail alt='' source={x?.product?.images + ''} size='small' />
  //                             <Text as='p' variant='bodyMd'>{x?.product?.title}</Text>
  //                           </div>
  //                           <Text as='p' variant='bodyMd'>x{x?.qty}</Text>
  //                         </div>
  //                       )
  //                     })
  //                   }
  //                 </div>
  //               </div>
  //             )
  //           })
  //         }
  //       </div>
  //     </div>
  //   </Page>
  // )

  return (
    <Page title='Today Orders' fullWidth>
      <Layout>
        <Layout.Section variant='fullWidth'>
          {loading && <Spinner />}
          {
            data && data.orderList?.map(order => {
              return (
                <div key={order?.id} className='flex flex-row gap-6 my-3'>
                  <div className='min-w-[100px]'>
                    <div className='mt-2 mb-2'>
                      <Text as='p' variant='bodyMd' fontWeight='bold' tone='base'>Order: #{order?.id} (Set {order?.set || ''})</Text>
                    </div>
                    <Button fullWidth variant='primary' tone='success' disabled={loadingChange} loading={loadingChange} onClick={() => handleUpdate(StatusOrder.Delivery, order?.id || 0)}>Ready</Button>
                  </div>
                  <div className='flex flex-row gap-6 flex-wrap'>
                    {
                      order?.items?.map(item => {
                        return (
                          <div key={item?.id} className='w-[225px] h-auto rounded-md bg-white relative overflow-hidden shadow-md flex flex-col justify-between'>
                            <div className='w-[225px] h-[100px] relative overflow-hidden'>
                              <img src={item?.product?.images || ''} alt="" className='w-fit h-auto object-contain' />
                            </div>
                            <div className='min-h-auto'>
                              <div className='px-2 mt-2'>
                                <Text as='p' variant='bodySm'>{item?.product?.title} ({item?.sku?.name})</Text>
                              </div>
                              <div className='my-2'><Divider /><div className='px-2 flex flex-row justify-between items-center'>Addon:<Text as='p' variant='bodySm'>{item?.addons || ""}</Text></div></div>
                              <div className='my-2'>
                                <div className='bg-amber-200 p-1 rounded-b-sm'><Text as='p' variant='bodySm'>Request: {item?.remark || ""}</Text></div>
                              </div>
                            </div>
                            <div className='p-2 flex flex-row items-center justify-between gap-2'>
                              <div className='flex flex-row items-center gap-1'>
                                <div className='font-bold'>X{item?.qty}</div>
                                {
                                  [StatusOrderItem.Completed, StatusOrderItem.Deleted].includes(item?.status as any) && <Text as='p' variant='bodyMd' tone={item?.status === StatusOrderItem.Completed ? 'success' : 'critical'}>{item?.status}</Text>
                                }
                              </div>
                              {/* {
                                ![StatusOrderItem.Completed, StatusOrderItem.Deleted].includes(item?.status as any) && <div className='flex flex-row gap-2'>
                                  <div onClick={() => {
                                    handleCancel(item?.id || 0)
                                  }} className={`p-1 ${loadingMark ? 'bg-slate-500' : 'bg-rose-600 hover:bg-rose-700'} rounded-lg text-white  cursor-pointer`}>
                                    <Icon source={XIcon as any} />
                                  </div>
                                  <div onClick={() => {
                                    handleCompleted(item?.id || 0)
                                  }} className={`p-1 ${loadingMark ? 'bg-slate-500' : 'bg-emerald-600 hover:bg-emerald-700'} rounded-lg text-white  cursor-pointer`}>
                                    <Icon source={CheckIcon as any} />
                                  </div>
                                </div>
                              } */}
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </Layout.Section>
      </Layout>
    </Page>
  )
}