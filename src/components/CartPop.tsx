/* eslint-disable @next/next/no-img-element */
import { Telegram } from '@/api/telegram';
import { useOrderContext } from '@/context/OrderContext';
import React, { useCallback, useState } from 'react';
import { useCustomToast } from './custom/CustomToast';
import {
  Button,
  ButtonGroup,
  Divider,
  Icon,
  IndexFilters,
  Modal,
  TabProps,
  Tabs,
  Thumbnail,
  useSetIndexFiltersMode,
} from '@shopify/polaris';
import { CartFilledIcon, CartIcon } from '@shopify/polaris-icons';
import { useWindowSize } from '@/hook/useWindowSize';
import {
  OrderInput,
  StatusOrder,
  StatusOrderItem,
  useChangeOrderStatusMutation,
  useCreateOrderMutation,
  useDecreaseOrderItemMutation,
  useIncreaseOrderItemMutation,
  useMarkOrderItemStatusMutation,
} from '@/gql/graphql';
import { useSearchParams } from 'next/navigation';
import { useSetting } from '@/service/useSettingProvider';
import { Modal as Modals } from '@/hook/modal';

const tabs: TabProps[] = [
  {
    content: 'New Order',
    id: '0',
  },
  {
    content: 'Order History',
    id: '1',
  },
];

export function CartPop() {
  const [select, setSelect] = useState(0);
  const params = useSearchParams();
  const { setToasts, toasts } = useCustomToast();
  const setting = useSetting();
  const { items, setItems, orderId, status, vat: vatPer, refetch, order } = useOrderContext();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const { width } = useWindowSize();
  const { mode, setMode } = useSetIndexFiltersMode();
  const [plus, { loading: loadingPlus }] = useIncreaseOrderItemMutation({
    refetchQueries: ['order'],
  });
  const [sub, { loading: loadingSub }] = useDecreaseOrderItemMutation({
    refetchQueries: ['order'],
  });
  const [mark, { loading: loadingMark }] = useMarkOrderItemStatusMutation({
    refetchQueries: ['order'],
  });
  const [change, { loading: loadingChange }] = useChangeOrderStatusMutation({
    refetchQueries: ['order'],
  });

  const [info] = useState({
    set: params.get('set') || 1,
    name: params.get('token') || new Date().getTime() + '' + (params.get('set') || 1),
  });

  const handleCheckout = useCallback(() => {
    const telegram = new Telegram();

    let text = `<b>Order Number: ${count}</b>%0A%0A`;

    if (items) {
      for (let i = 0; i < (items || []).length; i++) {
        text =
          text +
          `${i + 1}.${items[i].name} <code>📓${items[i].code}</code> ✅${items[i].qty} 💲${Number(
            items[i].price,
          ).toFixed(2)}/1Qty.%0A`;
      }
      text = text + `%0A%0A<b>Total: 💲${Number(items?.reduce((a, b) => (a = a + b.price * b.qty), 0)).toFixed(2)}</b>`;
    }

    telegram
      .sendMessage(text)
      .then((res) => {
        console.log(res);
        setItems && setItems([]);
        setCount(count === 100 ? 0 : count + 1);
        setShow(false);
      })
      .catch((err) => console.log(err));

    setToasts([
      ...toasts,
      {
        content: `Checkout order #${count}.`,
        status: 'success',
      },
    ]);
  }, [count, items, setItems, setToasts, toasts]);

  const handleRemove = useCallback(
    (i: number) => {
      const dummy = (items || []).filter((_, index) => index !== i);
      setItems && setItems(dummy);
      if (dummy.length === 0) {
        setShow(false);
      }
    },
    [items, setItems],
  );

  const handlePlaceOrder = useCallback(() => {
    setShow(false);
    Modals.dialog({
      title: 'Confirmation',
      body: [<div key={1}>Are ready to confirmation order?</div>],
      buttons: [
        { title: 'No' },
        {
          title: 'Yes',
          class: 'primary',
          onPress: () => {
            change({
              variables: {
                data: {
                  orderId: Number(orderId),
                  status: StatusOrder.Verify,
                },
              },
            })
              .then((res) => {
                if (res.data?.changeOrderStatus) {
                  setToasts([...toasts, { content: 'Your order was sent.', status: 'success' }]);
                  refetch();
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
    // change({
    //   variables: {
    //     data: {
    //       orderId: Number(orderId),
    //       status: StatusOrder.Checkout,
    //     },
    //   },
    // }).then((res) => {
    //   if (res.data?.changeOrderStatus) {
    //     setToasts([...toasts, { content: `Your order was sended.`, status: 'success' }]);
    //   }
    // });
  }, [change, orderId, refetch, setToasts, toasts]);

  if (!orderId) {
    return <></>;
  }

  const total = items?.reduce((a: any, b: any) => {
    const dis_price = Number(b.price) * (Number(b.discount) / 100);
    const amount = Number(b.qty) * (Number(b.price) - dis_price);
    return (a = a + amount);
  }, 0);

  const vatSetting = setting.find((f) => f.option === 'TAX')?.value;
  const discount = (total * Number(order.discount || 0)) / 100;

  const loading = loadingMark || loadingPlus || loadingChange || loadingSub;
  const edited =
    [StatusOrder.Pending, StatusOrder.Verify, StatusOrder.Delivery].includes(status) &&
    (items?.filter((f) => !f.isPrint).length || 0) > 0;

  const orderItems = items?.filter((f) => f.status === 'PENDING').length || 0;
  const orderHistory = items?.filter((f) => f.status !== 'PENDING').length || 0;

  return (
    <React.Fragment>
      <Modal
        open={show}
        onClose={() => {
          setShow(!show);
          refetch();
        }}
        title={'Checkout'}
      >
        <Modal.Section flush>
          <Tabs
            tabs={tabs.map((x) => {
              return { ...x, content: `${x.content} ${x.id === '0' ? `(${orderItems})` : `(${orderHistory})`}` };
            })}
            selected={select}
            onSelect={setSelect}
          />
        </Modal.Section>
        <Modal.Section flush>
          {items
            ?.filter((f) =>
              select === 1
                ? !![StatusOrderItem.Completed, StatusOrderItem.Making].includes(f.status)
                : ![StatusOrderItem.Completed, StatusOrderItem.Making].includes(f.status),
            )
            .map((x, i) => {
              const sku = x.sku.find((s: any) => s.id === x.sku_id);
              return (
                <div
                  key={i}
                  className={`${
                    x.status === StatusOrderItem.Completed
                      ? 'bg-emerald-200'
                      : x.isPrint
                      ? 'bg-gray-300 opacity-50'
                      : ''
                  } p-4`}
                >
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row">
                      <Thumbnail source={x.images || ''} alt="" size="medium" />
                      <div className="ml-2">
                        <b>
                          {x.title} ({sku.name})
                        </b>
                        <br />
                        <b className="text-rose-600">${sku ? Number(x.price).toFixed(2) : ''}</b>
                        {x.addon_value && (
                          <>
                            <br />
                            {x.addon_value.join(',')}
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <ButtonGroup variant="segmented">
                        {/* <Button
                          size="micro"
                          disabled={
                            !edited ||
                            x.status === StatusOrderItem.Completed ||
                            loading ||
                            !!x.isPrint ||
                            x.status !== 'PENDING'
                          }
                          onClick={() => {
                            const dummy = [...items];
                            if (dummy[i].qty === 1) {
                              setItems && setItems(items.filter((_, index) => index !== i));
                              mark({
                                variables: {
                                  markOrderItemStatusId: Number(x.orderItemid),
                                  status: StatusOrderItem.Deleted,
                                },
                              });
                              return;
                            }
                            dummy[i].qty = dummy[i].qty - 1;
                            setItems && setItems(dummy);
                            sub({
                              variables: {
                                decreaseOrderItemId: Number(x.orderItemid),
                              },
                            });
                          }}
                        >
                          -
                        </Button> */}
                        <Button disabled size="micro">
                          {x.qty}
                        </Button>
                        {/* <Button
                          size="micro"
                          disabled={
                            !edited ||
                            x.status === StatusOrderItem.Completed ||
                            loading ||
                            !!x.isPrint ||
                            x.status !== 'PENDING'
                          }
                          onClick={() => {
                            const dummy = [...items];
                            dummy[i].qty = dummy[i].qty + 1;
                            setItems && setItems(dummy);
                            plus({
                              variables: {
                                increaseOrderItemId: Number(x.orderItemid),
                              },
                            });
                          }}
                        >
                          +
                        </Button> */}
                      </ButtonGroup>
                      <small className="text-red-400">{x.isPrint ? 'Already to kitchen' : ''}</small>
                    </div>
                  </div>
                  <br />
                  {x.remark && (
                    <div className="bg-amber-200 p-1">
                      <b>Special Request:</b> {x.remark}
                    </div>
                  )}
                  <Divider />
                </div>
              );
            })}
        </Modal.Section>
        <Modal.Section>
          <div className="text-star w-full flex flex-col items-end">
            <h6 className="text-xs font-bold text-gray-600 flex flex-row items-center">
              <div className="w-[75px]">Amount:</div>
              <div className="w-[100px] text-right">${Number(total || 0).toFixed(2)}</div>
            </h6>
            <h6 className="text-xs font-bold text-gray-600 flex flex-row items-center">
              <div className="w-[75px]">Discount:</div>
              <div className="w-[100px] text-right">${Number(discount || 0).toFixed(2)}</div>
            </h6>
            <h6 className="text-xs my-1 mb-2 font-bold text-gray-600 flex flex-row items-center">
              <div className="w-[100px] text-right">Include. ({vatSetting}%)</div>
            </h6>
            <h4 className="text-lg font-bold flex flex-row items-center">
              <div className="w-[75px]">Total: </div>
              <span className=" text-emerald-700 w-[100px] text-right">
                ${(Number(total || 0) - discount).toFixed(2)}
              </span>
            </h4>
          </div>
        </Modal.Section>
        {/* {!!edited && (
          <Modal.Section>
            <div
              onClick={() => (loading || items?.length === 0 || orderItems <= 0 ? {} : handlePlaceOrder())}
              className={`${
                loading || items?.length === 0 || orderItems <= 0
                  ? 'bg-gray-500'
                  : 'bg-emerald-700 hover:bg-emerald-600'
              } text-white p-2 w-full text-center rounded-lg`}
            >
              Send Order to Kitchen
            </div>
          </Modal.Section>
        )} */}
      </Modal>
      <div
        className="w-[25px] cursor-pointer h-[25px] flex flex-row self-center relative"
        onClick={() => {
          //  && (width || 0) <= 640
          if ((items || []).length > 0) {
            setShow(!show);
          }
        }}
      >
        <Icon source={CartFilledIcon} tone="base" />
        {items && items.length > 0 && (
          <span className="absolute cursor-pointer top-[-10px] left-[-10px] inline-flex items-center rounded-full bg-red-400 px-1 py-[2px] text-xs font-medium text-red-100 ring-1 ring-inset ring-pink-700/10">
            {items.reduce((a, b) => (a = a + b.qty), 0)}
          </span>
        )}
      </div>
    </React.Fragment>
  );
}
