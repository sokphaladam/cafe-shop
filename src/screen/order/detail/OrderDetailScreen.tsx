'use client';
import React, { useCallback, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Frame,
  IndexTable,
  Layout,
  Loading,
  Page,
  Text,
  Thumbnail,
  Modal as Modals,
  TextField,
} from '@shopify/polaris';
import { StatusOrder, useChangeOrderStatusMutation, useOrderQuery, useOrderSubscriptSubscription } from '@/gql/graphql';
import { InfoIcon, CheckCircleIcon, DeliveryIcon, ClipboardCheckFilledIcon, XCircleIcon } from '@shopify/polaris-icons';
import { useCustomToast } from '@/components/custom/CustomToast';
import { Modal } from '@/hook/modal';
import { useSetting } from '@/service/useSettingProvider';
import { PrintOrder } from '../components/PrintOrder';
import { SignatureOrder } from '../components/SignatureOrder';
import { DeliveryPickup } from '../components/DeliveryPickup';

interface Props {
  id: number;
}

const toneStatus: any = {
  [StatusOrder.Pending]: 'attention-strong',
  [StatusOrder.Verify]: 'info-strong',
  [StatusOrder.Delivery]: 'success',
  [StatusOrder.Checkout]: 'success-strong',
  [StatusOrder.Cancelled]: 'critical-strong',
};

const toneIcon: any = {
  [StatusOrder.Pending]: InfoIcon,
  [StatusOrder.Verify]: CheckCircleIcon,
  [StatusOrder.Delivery]: DeliveryIcon,
  [StatusOrder.Checkout]: ClipboardCheckFilledIcon,
  [StatusOrder.Cancelled]: XCircleIcon,
};

export function OrderDetailScreen(props: Props) {
  const { setToasts, toasts } = useCustomToast();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [paid, setPaid] = useState(false);
  const setting = useSetting();
  const [reasonInput, setReasonInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const toggelOpen = useCallback(() => setOpen(!open), [open]);
  const toggleActive = useCallback(() => setActive(!active), [active]);
  const togglePaid = useCallback(() => setPaid(!paid), [paid]);

  const { data, loading, refetch } = useOrderQuery({
    variables: {
      orderId: Number(props.id),
    },
  });
  const [change] = useChangeOrderStatusMutation({
    refetchQueries: ['order', 'orderList'],
  });
  useOrderSubscriptSubscription({
    onData: (res) => {
      if (res.data.data?.orderSubscript.status === 2 || !!res.data.data?.orderSubscript.uuid) {
        refetch();
      }
    },
  });

  const handleUpdate = useCallback(
    (status: StatusOrder) => {
      toggelOpen();
      if (status === StatusOrder.Cancelled) {
        toggleActive();
        return;
      }
      if (status === StatusOrder.Checkout) {
        togglePaid();
        return;
      } else {
        Modal.dialog({
          title: 'Confirmation',
          body: [
            <div key={1}>
              You are select order <b>#{data?.order?.id}</b> to <b>{status.toLowerCase()}</b>.
            </div>,
          ],
          buttons: [
            { title: 'No' },
            {
              title: 'Yes',
              class: 'primary',
              onPress: () => {
                change({
                  variables: {
                    data: {
                      orderId: Number(data?.order?.id),
                      status,
                    },
                  },
                })
                  .then((res) => {
                    if (res.data?.changeOrderStatus) {
                      setToasts([...toasts, { content: 'Update status was success.', status: 'success' }]);
                    } else {
                      setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
                    }
                  })
                  .catch(() => {
                    setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
                  });
              },
            },
          ],
        });
      }
    },
    [change, data?.order?.id, setToasts, toasts, toggelOpen, toggleActive, togglePaid],
  );

  if (loading) {
    <Page title="Order Detail">
      <Frame>
        <Loading />
      </Frame>
    </Page>;
  }

  const total = data?.order?.items?.reduce((a: any, b: any) => {
    const dis_price = Number(b.price) * (Number(b.discount) / 100);
    const amount = Number(b.qty) * (Number(b.price) - dis_price);
    return (a = a + amount);
  }, 0);

  const vatPer = data?.order?.vat || '0';
  const exchangeRate = setting.find((f) => f.option === 'EXCHANGE_RATE');
  const vat = (total * Number(vatPer || 0)) / 100;

  const totalAfterVat = total + vat;

  return (
    <Page
      title={`Order Detail #${props.id}`}
      subtitle={
        data?.order?.status === StatusOrder.Checkout && Number(data?.order?.paid || 0)
          ? ((<Badge tone="success-strong">{(<small>PAID</small>) as any}</Badge>) as any)
          : ''
      }
    >
      {/* Cancel */}
      <Modals
        open={active}
        onClose={toggleActive}
        title={`Cancel Order #${data?.order?.id}`}
        primaryAction={{
          content: 'Cancel',
          destructive: true,
          onAction: () => {
            if (!reasonInput) {
              setToasts([...toasts, { content: 'Please input the reason!', status: 'error' }]);
              return;
            }
            change({
              variables: {
                data: {
                  orderId: Number(data?.order?.id),
                  status: StatusOrder.Cancelled,
                  reason: reasonInput,
                },
              },
            })
              .then((res) => {
                if (res.data?.changeOrderStatus) {
                  setToasts([...toasts, { content: 'Update status was success.', status: 'success' }]);
                  setReasonInput('');
                  toggleActive();
                } else {
                  setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
                }
              })
              .catch(() => {
                setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
              });
          },
        }}
      >
        <Modals.Section>
          <TextField
            autoComplete="off"
            label="Why do you want to cancel the order?"
            multiline={5}
            placeholder="Please give me a reason..."
            value={reasonInput}
            onChange={setReasonInput}
            requiredIndicator
          />
        </Modals.Section>
      </Modals>
      {/* Checkout */}
      <Modals
        open={paid}
        onClose={togglePaid}
        title={`Checkout Order #${data?.order?.id}`}
        primaryAction={{
          content: 'Checkout',
          destructive: true,
          onAction: () => {
            // if (!amountInput) {
            //   setToasts([...toasts, { content: 'Please input the amount of customer are paid for order!', status: 'error' }])
            //   return;
            // }
            change({
              variables: {
                data: {
                  orderId: Number(data?.order?.id),
                  status: StatusOrder.Checkout,
                  reason: reasonInput || '',
                  amount: amountInput ? String(amountInput) : String(totalAfterVat.toFixed(2)),
                },
              },
            })
              .then((res) => {
                if (res.data?.changeOrderStatus) {
                  setToasts([...toasts, { content: 'Update status was success.', status: 'success' }]);
                  setReasonInput('');
                  setAmountInput('');
                  togglePaid();
                } else {
                  setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
                }
              })
              .catch(() => {
                setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
              });
          },
        }}
        footer={
          <div className="font-bold">
            Exchange Rate: <span className="pl-2">$1 = ៛{exchangeRate?.value}</span>
            <br />
            Total: <span className="pl-2">${totalAfterVat.toFixed(2)}</span>
            <br />
            Paid: <span className="pl-2">${Number(amountInput || totalAfterVat).toFixed(2)}</span>
            <br />
            Return to customer:{' '}
            <span className="pl-2">${(Number(amountInput || totalAfterVat) - Number(totalAfterVat)).toFixed(2)}</span>
          </div>
        }
      >
        <Modals.Section>
          <TextField
            type="number"
            autoComplete="off"
            value={amountInput || totalAfterVat.toFixed(2)}
            onChange={setAmountInput}
            label="Amount cutomer paid"
            placeholder="Please input amount of customer are paid for order here"
            requiredIndicator
          />
          <br />
          <TextField
            autoComplete="off"
            label="Do you have remark?"
            multiline={5}
            placeholder="comment here..."
            value={reasonInput}
            onChange={setReasonInput}
          />
        </Modals.Section>
      </Modals>
      <Layout>
        <Layout.Section variant="oneHalf">
          <Card padding={'0'}>
            <Box padding={'300'}>
              <div className="flex flex-row justify-between items-baseline">
                <div className="flex flex-row gap-4">
                  <PrintOrder order={data?.order} subtotal={total} vat={vat + ''} total={totalAfterVat} />
                  <PrintOrder order={data?.order} subtotal={total} vat={vat + ''} total={totalAfterVat} kitchen />
                  <SignatureOrder order={data?.order || {}} size="micro" />
                  {data?.order?.status === StatusOrder.Pending && (
                    <Button
                      onClick={() => handleUpdate(StatusOrder.Verify)}
                      size="micro"
                      tone="success"
                      variant="primary"
                    >
                      Verify
                    </Button>
                  )}
                  {data?.order?.status === StatusOrder.Verify && (
                    <Button
                      size="micro"
                      tone="success"
                      variant="primary"
                      onClick={() => handleUpdate(StatusOrder.Delivery)}
                    >
                      Deliver
                    </Button>
                  )}
                  {[StatusOrder.Delivery, StatusOrder.Checkout].includes(data?.order?.status as any) &&
                    Number(data?.order?.paid || 0) <= 0 && (
                      <Button
                        size="micro"
                        tone="success"
                        variant="primary"
                        onClick={() => handleUpdate(StatusOrder.Checkout)}
                      >
                        Checkout
                      </Button>
                    )}
                  {[StatusOrder.Checkout].includes(data?.order?.status as any) &&
                    Number(data?.order?.paid || 0) <= 0 && (
                      <Button
                        size="micro"
                        tone="critical"
                        variant="primary"
                        onClick={() => handleUpdate(StatusOrder.Cancelled)}
                      >
                        Cancel
                      </Button>
                    )}
                </div>
                <div className="flex flex-col items-end">
                  <b>
                    <small>{data?.order?.uuid || ''}</small>
                  </b>
                  <b className="mb-2">
                    <small>
                      SET: {data?.order?.set} (#{data?.order?.code})
                    </small>
                  </b>
                  <Badge
                    tone={toneStatus[data?.order?.status || '']}
                    icon={toneIcon[data?.order?.status || '']}
                    size="small"
                  >
                    {(<small>{data?.order?.status || ''}</small>) as any}
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
                {data?.order?.items?.map((item, index) => {
                  const priceAfterDis = Number(item?.price) - (Number(item?.price) * Number(item?.discount)) / 100;
                  return (
                    <IndexTable.Row key={index} position={index} id={item?.id + ''}>
                      <IndexTable.Cell>{index + 1}</IndexTable.Cell>
                      <IndexTable.Cell>
                        <div className="flex flex-row gap-2">
                          <Thumbnail alt="" source={item?.product?.images + ''} size="small" />
                          <div className="flex flex-col justify-between">
                            <Text as="p" variant="bodySm" truncate>
                              {item?.product?.title}
                            </Text>
                            <Text as="strong" variant="bodySm" tone="base">
                              x{item?.qty}
                            </Text>
                          </div>
                        </div>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="strong" variant="bodySm">
                          ${priceAfterDis.toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="strong" variant="bodySm" fontWeight="bold" tone="success">
                          ${(priceAfterDis * Number(item?.qty)).toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  );
                })}
              </IndexTable>
            </Box>
            <Divider />
            <Box padding={'300'}>
              <div className="flex flex-row justify-between items-start">
                <div>
                  <div>
                    <Text as="h4" variant="bodyMd" fontWeight="bold">
                      Delivery Pickup
                    </Text>
                  </div>
                  {data?.order?.delivery && (
                    <div className="mt-3">
                      <Text as="p" variant="bodySm" tone="base">
                        {data?.order?.delivery?.name}
                      </Text>
                      <Text as="p" variant="bodySm" tone="base">
                        #{data?.order?.deliveryCode}
                      </Text>
                    </div>
                  )}
                </div>
                <DeliveryPickup order={data?.order || {}} />
              </div>
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card padding={'0'}>
            <Box>
              <IndexTable
                headings={[
                  { title: (<div className="ml-1">Description</div>) as any },
                  { title: 'Amount', alignment: 'end' },
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
                    {data && (
                      <div className="mr-1">
                        <Text as="strong" variant="bodySm" alignment="end">
                          ${total.toFixed(2)}
                        </Text>
                      </div>
                    )}
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
                    {data && (
                      <div className="mr-1">
                        <Text as="strong" variant="bodySm" alignment="end">
                          ${vat.toFixed(2)} ({vatPer || 0}%)
                        </Text>
                      </div>
                    )}
                  </IndexTable.Cell>
                </IndexTable.Row>
                <IndexTable.Row id={'1'} position={1}>
                  <IndexTable.Cell>
                    <div className="ml-1">
                      <Text as="strong" variant="bodySm">
                        Total
                      </Text>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <div className="mr-1">
                      <Text as="strong" variant="bodySm" alignment="end" tone="critical" fontWeight="bold">
                        ${totalAfterVat.toFixed(2)}
                      </Text>
                    </div>
                  </IndexTable.Cell>
                </IndexTable.Row>
              </IndexTable>
            </Box>
          </Card>
          <br />
          <Card padding={'0'}>
            <Box>
              <IndexTable
                headings={[{ title: '#' }, { title: 'Date', alignment: 'end' }]}
                itemCount={1}
                selectable={false}
              >
                {data?.order?.log?.map((x, i) => {
                  return (
                    <IndexTable.Row key={x?.text} position={i} id={x?.text + ''}>
                      <IndexTable.Cell>
                        <small>{x?.text}</small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <div className="text-end">
                          <small>{x?.date}</small>
                          {x?.by && (
                            <div>
                              <small>({x?.by?.display})</small>
                            </div>
                          )}
                        </div>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  );
                })}
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
