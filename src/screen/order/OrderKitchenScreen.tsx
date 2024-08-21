/* eslint-disable @next/next/no-img-element */
'use client'
import { useCustomToast } from '@/components/custom/CustomToast';
import { OrderViewBy, StatusOrderItem, useMarkOrderItemStatusMutation, useOrderListQuery, useSubscriptionLoadSubscription } from '@/gql/graphql';
import { config_app } from '@/lib/config_app';
import { Box, Button, Card, Divider, Icon, IndexTable, Layout, Page, Spinner, Text } from '@shopify/polaris';
import { CheckIcon, XIcon } from '@shopify/polaris-icons';
import React, { useCallback, useEffect, useRef } from 'react';

export function OrderKitchenScreen() {
  const ref = useRef<HTMLAudioElement>(null)
  const { setToasts, toasts } = useCustomToast();
  const [mark, { loading: loadingMark }] = useMarkOrderItemStatusMutation({
    refetchQueries: ['order', 'orderList']
  })
  const { data, loading, refetch } = useOrderListQuery({
    variables: {
      viewBy: OrderViewBy.Kitchen
    },
  });
  useSubscriptionLoadSubscription({
    onData: (res) => {
      refetch();
      // if (ref.current) {
      //   let play = ref.current.play();
      //   if (play !== undefined) {
      //     play.then(_ => {
      //       //
      //       ref.current?.pause()
      //     }).catch(_ => {
      //       //
      //     })
      //   }
      // }
      setToasts([...toasts, { content: res.data.data?.newOrderPending + '', status: 'info' }])
    }
  });

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

  if (loading || !data) {
    return <></>
  }

  return (
    <Page title='Today Orders' fullWidth>
      {/* <audio style={{ display: 'none' }} ref={ref} id='idAudio' controls src="https://firebasestorage.googleapis.com/v0/b/serv-cafe.appspot.com/o/assets%2Fmixkit-software-interface-start-2574.wav?alt=media&token=b9f0ce33-a7b7-429d-96e8-9a09b5fc2311"></audio> */}
      <Layout>
        <Layout.Section variant='fullWidth'>
          {loading && <Spinner />}
          {
            data && data.orderList?.map(order => {
              return (
                <div key={order?.id} className='flex flex-row gap-6 my-3'>
                  <div className='min-w-[100px]'>
                    <Button fullWidth>Set {order?.set || ''}</Button>
                    <div className='mt-2'>
                      <Text as='p' variant='bodyMd' fontWeight='bold' tone='base'>Order: #{order?.id}</Text>
                    </div>
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
                              {
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
                              }
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