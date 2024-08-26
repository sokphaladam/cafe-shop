'use client'
import React from 'react';
import { Badge, Box, Button, Card, Divider, Frame, IndexTable, Layout, Loading, Page, Text, Thumbnail } from '@shopify/polaris';
import { StatusOrder, useOrderQuery, useSubscriptionLoadSubscription } from '@/gql/graphql';
import { InfoIcon, CheckCircleIcon, DeliveryIcon, ClipboardCheckFilledIcon, XCircleIcon } from '@shopify/polaris-icons';
import { useCustomToast } from '@/components/custom/CustomToast';

interface Props { id: number }

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

export function OrderDetailScreen(props: Props) {
  const { setToasts, toasts } = useCustomToast();
  const { data, loading, refetch } = useOrderQuery({
    variables: {
      orderId: Number(props.id)
    }
  })
  // useSubscriptionLoadSubscription({
  //   onData: (res) => {
  //     refetch();
  //     setToasts([...toasts, { content: res.data.data?.newOrderPending + '', status: 'info' }])
  //   }
  // });

  if (loading) {
    <Page title='Order Detail'>
      <Frame>
        <Loading />
      </Frame>
    </Page>
  }

  console.log(data)

  const total = data?.order?.items?.reduce((a: any, b: any) => {
    const dis_price = Number(b.price) * (Number(b.discount) / 100);
    const amount = Number(b.qty) * (Number(b.price) - dis_price);
    return (a = a + amount);
  }, 0);

  const vat = total * 10 / 100;

  const totalAfterVat = total + vat

  return (
    <Page title={`Order Detail #${props.id}`}>
      <Layout>
        <Layout.Section variant='oneHalf'>
          <Card padding={'0'}>
            <Box padding={'300'}>
              <div className='flex flex-row justify-between items-baseline'>
                <div className='flex flex-row gap-4'>
                  <Button size='micro'>Print Recipt</Button>
                  {
                    data?.order?.status === StatusOrder.Pending && <Button size='micro' tone='success' variant='primary'>Verify</Button>
                  }
                  {
                    data?.order?.status === StatusOrder.Verify && <Button size='micro' tone='success' variant='primary'>Deliver</Button>
                  }
                  {
                    [StatusOrder.Delivery, StatusOrder.Checkout].includes(data?.order?.status as any) && <Button size='micro' tone='success' variant='primary'>Checkout</Button>
                  }
                  <Button size='micro' tone='critical' variant='primary'>Cancel</Button>
                </div>
                <div className='flex flex-col items-end'>
                  <b><small>{data?.order?.uuid || ""}</small></b>
                  <b className='mb-2'><small>SET: {data?.order?.set}</small></b>
                  <Badge tone={toneStatus[data?.order?.status || '']} icon={toneIcon[data?.order?.status || ""]} size='small'>
                    {
                      <small>{data?.order?.status || ''}</small> as any
                    }
                  </Badge>
                </div>
              </div>
            </Box>
            <Divider />
            <Box>
              <IndexTable
                headings={[{ title: '#' }, { title: 'Info' }, { title: 'Price' }, { title: 'Amount' }]}
                itemCount={data?.order?.items?.length || 0}
                selectable={false}
              >
                {
                  data?.order?.items?.map((item, index) => {
                    const priceAfterDis = Number(item?.price) - (Number(item?.price) * Number(item?.discount) / 100)
                    return (
                      <IndexTable.Row key={index} position={index} id={item?.id + ""}>
                        <IndexTable.Cell>{index + 1}</IndexTable.Cell>
                        <IndexTable.Cell>
                          <div className='flex flex-row gap-2'>
                            <Thumbnail alt='' source={item?.product?.images + ''} size='small' />
                            <div className='flex flex-col justify-between'>
                              <Text as='p' variant='bodySm' truncate>{item?.product?.title}</Text>
                              <Text as='strong' variant='bodySm' tone='base'>x{item?.qty}</Text>
                            </div>
                          </div>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <Text as='strong' variant='bodySm'>${priceAfterDis.toFixed(2)}</Text>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <Text as='strong' variant='bodySm' fontWeight='bold' tone='success'>${(priceAfterDis * Number(item?.qty)).toFixed(2)}</Text>
                        </IndexTable.Cell>
                      </IndexTable.Row>
                    )
                  })
                }
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant='oneThird'>
          <Card padding={'0'}>
            <Box>
              <IndexTable
                headings={[
                  { title: (<div className="ml-1">Description</div>) as any },
                  { title: "Amount", alignment: "end" },
                ]}
                itemCount={1}
                selectable={false}
              >
                <IndexTable.Row id="1" position={1}>
                  <IndexTable.Cell>
                    <div className="ml-1">
                      <Text as="strong" variant="bodySm">
                        Item(s) Total
                      </Text>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    {
                      data && <div className="mr-1">
                        <Text as="strong" variant="bodySm" alignment="end">
                          ${total.toFixed(2)}
                        </Text>
                      </div>
                    }
                  </IndexTable.Cell>
                </IndexTable.Row>
                <IndexTable.Row id="1" position={1}>
                  <IndexTable.Cell>
                    <div className="ml-1">
                      <Text as="strong" variant="bodySm">
                        Vat.
                      </Text>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    {
                      data && <div className="mr-1">
                        <Text as="strong" variant="bodySm" alignment="end">
                          ${vat.toFixed(2)} (10%)
                        </Text>
                      </div>
                    }
                  </IndexTable.Cell>
                </IndexTable.Row>
                <IndexTable.Row id={"1"} position={1}>
                  <IndexTable.Cell>
                    <div className="ml-1">
                      <Text as="strong" variant="bodySm">
                        Total
                      </Text>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <div className="mr-1">
                      <Text
                        as="strong"
                        variant="bodySm"
                        alignment="end"
                        tone="critical"
                        fontWeight='bold'
                      >
                        ${totalAfterVat.toFixed(2)}
                      </Text>
                    </div>
                  </IndexTable.Cell>
                </IndexTable.Row>
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}