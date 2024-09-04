import { Telegram } from '@/api/telegram';
import { useCustomToast } from '@/components/custom/CustomToast';
import { useOrderContext } from '@/context/OrderContext';
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
import { useWindowSize } from '@/hook/useWindowSize';
import { useSetting } from '@/service/useSettingProvider';
import { Button, ButtonGroup, Divider, Icon, Modal, TextField, Thumbnail } from '@shopify/polaris';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { Modal as Modals } from '@/hook/modal';

export function LayoutCart() {
  const params = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const { items, setItems, orderId, status, vat: VatP } = useOrderContext();
  const { toasts, setToasts } = useCustomToast();
  const { width } = useWindowSize();
  const [plus] = useIncreaseOrderItemMutation();
  const [sub] = useDecreaseOrderItemMutation();
  const [mark] = useMarkOrderItemStatusMutation();
  const [change] = useChangeOrderStatusMutation({
    refetchQueries: ['order'],
  });

  const [info] = useState({
    set: params.get('set') || 1,
    name: params.get('token') || new Date().getTime() + '' + (params.get('set') || 1),
  });

  const handleCreateOrder = useCallback(() => {
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
                  setToasts([...toasts, { content: 'Your order was sended.', status: 'success' }]);
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
    //       status: StatusOrder.Verify,
    //     },
    //   },
    // }).then((res) => {
    //   if (res.data?.changeOrderStatus) {
    //     setToasts([...toasts, { content: `Your order was sended.`, status: 'success' }]);
    //   }
    // });

    /*
    const input: OrderInput = {
      set: info.set + "",
      name: info.name,
      address: '',
      carts: items?.map(item => {
        const sku = item.sku.find((s: any) => s.id === item.sku_id);
        return {
          skuId: item.sku_id,
          qty: item.qty,
          addons: item.addon_value.join(','),
          discount: sku.discount,
          price: sku.price,
          productId: item.id,
          remark: item.remark
        }
      })
    }

    createOrder({
      variables: {
        data: input
      }
    }).then(res => {
      if (res.data?.createOrder) {
        process.browser && localStorage.removeItem(info.name);
        setItems && setItems([]);
        setToasts([...toasts, { content: `Your order was sended.`, status: 'success' }])
      }
    })
      */
  }, [change, orderId, setToasts, toasts]);

  const handleCheckout = useCallback(() => {
    const telegram = new Telegram();
    let text = `<b>Phone Number: ${phone}</b>%0A%0A`;

    if (items) {
      const dummy = items.map((x, i) => {
        const sku = x.sku.find((s: any) => s.id === x.sku_id);
        return {
          i: i + 1,
          name: `${x.title}(${sku.name})`,
          qty: x.qty,
          price: `${sku.price}`,
          remark: x.remark ? `(${x.remark})` : '',
        };
      });

      for (let i = 0; i < (dummy || []).length; i++) {
        text =
          text +
          `${i + 1}.${dummy[i].name} ✅${dummy[i].qty} 💲${Number(dummy[i].price).toFixed(2)}/1Qty.%0A ${
            dummy[i].remark
          }%0A`;
      }
      text =
        text +
        `%0A%0A<b>Total: 💲${Number(dummy?.reduce((a: any, b: any) => (a = a + b.price * b.qty), 0)).toFixed(2)}</b>`;
    }
    telegram
      .sendMessage(text)
      .then((res) => {
        console.log(res);
        setItems && setItems([]);
        setPhone('');
        setOpen(!open);
      })
      .catch((err) => console.log(err));
  }, [items, open, phone, setItems]);

  if (!orderId) {
    return <></>;
  }

  const total = items?.reduce((a: any, b: any) => {
    const dis_price = Number(b.price) * (Number(b.discount) / 100);
    const amount = Number(b.qty) * (Number(b.price) - dis_price);
    return (a = a + amount);
  }, 0);

  const vat = (total * Number(VatP || 0)) / 100;
  const totalAfterVat = total + vat;

  if ((width || 0) <= 640) {
    return <div></div>;
  }

  const edited = [StatusOrder.Pending, StatusOrder.Verify, StatusOrder.Delivery].includes(status);

  return (
    <div className={`w-[30%] bg-white rounded-lg sticky top-[11%]`} style={{ height: window.innerHeight / 1.2 }}>
      <Modal
        title="Confirmation"
        open={open}
        onClose={() => setOpen(!open)}
        primaryAction={{
          content: 'Confirm',
          onAction: handleCheckout,
        }}
      >
        <Modal.Section>
          <TextField value={phone} label="Phone number" onChange={setPhone} autoComplete="off" type="number" />
        </Modal.Section>
      </Modal>
      <div className="h-[50px] border-collapse border-gray-200 border-b-[0.5px] p-3">
        <h3 className="font-bold text-lg">Checkout</h3>
      </div>
      <div className="h-[400px] overflow-auto relative" style={{ height: window.innerHeight / 1.2 - 100 }}>
        {!edited && (
          <div className="bg-black opacity-50 absolute top-0 bottom-0 left-0 right-0 z-999 rounded-lg flex flex-col justify-center items-center text-slate-200">
            This order already completed.
          </div>
        )}
        {items?.length === 0 && (
          <div className="flex flex-col items-center justify-center" style={{ height: window.innerHeight / 1.2 - 100 }}>
            <div>Order anything you want</div>
          </div>
        )}
        {items?.map((x, i) => {
          const sku = x.sku.find((s: any) => s.id === x.sku_id);
          return (
            <div key={i} className={`p-4 ${x.status === StatusOrderItem.Completed ? 'bg-emerald-400' : ''}`}>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row">
                  <Thumbnail source={x.images || ''} alt="" size="medium" />
                  <div className="ml-2">
                    <b>{x.title}</b>
                    <br />
                    <b>
                      ${sku ? sku.price : ''} ({sku.name})
                    </b>
                    <br />
                    {x.addon_value.join(',')}
                  </div>
                </div>
                <div>
                  <ButtonGroup variant="segmented">
                    <Button
                      disabled={!edited || x.status === StatusOrderItem.Completed}
                      size="micro"
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
                    </Button>
                    <Button disabled size="micro">
                      {x.qty}
                    </Button>
                    <Button
                      disabled={!edited || x.status === StatusOrderItem.Completed}
                      size="micro"
                      onClick={() => {
                        const dummy = [...items];
                        plus({
                          variables: {
                            increaseOrderItemId: Number(x.orderItemid),
                          },
                        });
                        dummy[i].qty = dummy[i].qty + 1;
                        setItems && setItems(dummy);
                      }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              <br />
              {x.remark && (
                <>
                  <div className="bg-amber-200 p-1">Special Request: {x.remark}</div>
                  <Divider />
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[140px] border-collapse border-gray-200 border-t-[0.5px] p-4">
        <div className="flex flex-row justify-start items-center">
          <div className="text-start w-full flex flex-col items-end">
            <div className="text-star w-full flex flex-col items-end">
              <h6 className="text-xs font-bold text-gray-600 flex flex-row items-center">
                <div className="w-[75px]">Amount:</div>
                <div className="w-[100px] text-right">${Number(total || 0).toFixed(2)}</div>
              </h6>
              <h6 className="text-xs my-1 mb-2 font-bold text-gray-600 flex flex-row items-center">
                <div className="w-[75px]">Vat.:</div>
                <div className="w-[100px] text-right">
                  ${vat.toFixed(2)} ({VatP}%)
                </div>
              </h6>
              <h4 className="text-lg font-bold flex flex-row items-center">
                <div className="w-[75px]">Total: </div>
                <span className=" text-emerald-700 w-[100px] text-right">${Number(totalAfterVat || 0).toFixed(2)}</span>
              </h4>
            </div>
          </div>
        </div>
        {!!edited && (
          <div
            className={`p-2 w-full text-center ${
              items?.length === 0 ? 'bg-gray-500' : 'bg-emerald-700 hover:bg-emerald-600'
            } text-white rounded-md cursor-pointer`}
            onClick={() => (items?.length === 0 ? {} : handleCreateOrder())}
          >
            Send Order to Kitchen
          </div>
        )}
      </div>
    </div>
  );
}
