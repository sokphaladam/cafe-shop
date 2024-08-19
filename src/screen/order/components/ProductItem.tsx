/* eslint-disable @next/next/no-img-element */
import { useCustomToast } from '@/components/custom/CustomToast';
import { useOrderContext } from '@/context/OrderContext';
import { CartItemInput, Product, useAddOrderItemMutation } from '@/gql/graphql';
import { Button, ChoiceList, Divider, Modal, RadioButton, TextField, Thumbnail } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';

interface Props {
  product: Product
  keyItem: string;
}

export function ProductItem(props: Props) {
  const { toasts, setToasts } = useCustomToast();
  const { items, setItems, orderId, refetch } = useOrderContext();
  const [open, setOpen] = useState(false);
  const [addons, setAddons] = useState<any[]>(props.product.addons?.map(() => '') || []);
  const [sku, setSku] = useState<number>(0);
  const [remark, setRemark] = useState('');

  const [addCart] = useAddOrderItemMutation({
    refetchQueries: ['order']
  });

  const handleAddtoCart = useCallback(() => {
    if (sku === 0) {
      return;
    }

    const data = [...(items || [])];
    const index = data.findIndex(f => f.id === props.product.id);
    const skuIndex = props.product.sku?.findIndex((f: any) => Number(f?.id) === sku);

    if (index >= 0) {
      data[index].qty = data[index].qty + 1;
    }
    // else {
    //   data.push({
    //     ...props.product,
    //     id: props.product.id,
    //     addon_value: addons,
    //     sku_id: sku,
    //     remark,
    //     qty: 1,
    //   })

    //   setItems && setItems(data)
    // }

    const input: CartItemInput = {
      skuId: sku,
      productId: props.product.id,
      addons: addons.join(','),
      discount: skuIndex !== undefined ? Number((props.product.sku || [])[skuIndex]?.discount) : 0,
      price: skuIndex !== undefined ? Number((props.product.sku || [])[skuIndex]?.price) : 0,
      qty: index >= 0 ? data[index].qty + 1 : 1,
      remark: remark
    }

    addCart({
      variables: {
        orderId: Number(orderId),
        data: input
      }
    }).then(res => {
      if (res.data?.addOrderItem) {
        setToasts([
          ...toasts,
          {
            content: `Add ${props.product.title} to cart`,
            status: 'info'
          }
        ])
        refetch();
      }
    })

    // setItems && setItems(data);
    // process.browser && localStorage.setItem(props.keyItem, JSON.stringify(data));

    setOpen(!open)
  }, [addCart, addons, items, open, orderId, props.product, refetch, remark, setItems, setToasts, sku, toasts])

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(!open)} title titleHidden>
        <Modal.Section flush>
          <img src={props.product.images || ''} alt="" className='w-full max-h-[275px] object-contain' />
          <div className='p-4'>
            <div className='text-lg font-bold'>{props.product.title}</div>
            <div>{props.product.description}</div>
            <br />
            <div className='text-red-500 font-bold'>${(props.product.sku || [])[0]?.price}</div>
            <br />
            <Divider />
            <br />
            <div className='border-solid border-[0.5px] rounded-md mb-2 p-2 border-red-400'>
              {
                props.product.sku?.map((x, i) => {
                  return (
                    <RadioButton checked={sku === x?.id} onChange={v => setSku(v === true ? (x?.id || 0) : 0)} label={x?.name} key={i} helpText={<div>${x?.price}</div> as any} />
                  )
                })
              }
            </div>
            {(props.product.addons || []).length > 0 && (
              <div>
                {props.product.addons?.map((x, i) => {
                  return (
                    <div key={i} className='border-solid border-[0.5px] rounded-md mb-2 p-2'>
                      <div className='flex flex-row justify-between items-center'>
                        <div>{x?.name}</div>
                        <div>{x?.isRequired ? 'Required' : 'Optional'}</div>
                      </div>
                      <ChoiceList
                        key={x?.id}
                        title={x?.name}
                        titleHidden
                        choices={x?.value?.split(',').map(v => ({ label: v, value: x.name + '(' + v + ")" })) || []}
                        selected={addons[i]}
                        onChange={v => {
                          const dummy = [...addons];
                          dummy[i] = v[0];
                          setAddons(dummy)
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            <TextField value={remark} onChange={v => setRemark(v)} label="Special instructions" multiline={3} autoComplete='off' placeholder={`Special requests are subject to the restaurant's approval. Tell us here!`} />
          </div>
        </Modal.Section>
        <Modal.Section>
          <div className='flex flex-row items-center'>
            <Button fullWidth tone='success' variant='primary' onClick={handleAddtoCart}>Add to cart</Button>
          </div>
        </Modal.Section>
      </Modal>
      <div onClick={() => setOpen(!open)} className="bg-white rounded-lg py-2 px-4 flex flex-row justify-between items-center cursor-pointer hover:scale-105 hover:bg-gray-50 transition-all">
        <div className="max-w-[250px] max-sm:w-[210px] max-lg:w-[180px]">
          <b className="text-lg">{props.product.title}</b>
          <div className="text-red-500 font-bold my-2">${(props.product.sku || [])[0]?.price}</div>
          <div className="max-h-[30px] truncate">{props.product.description}</div>
        </div>
        <div className="w-[75px]"><Thumbnail alt="" source={props.product.images || ""} size="large" /></div>
      </div>
    </React.Fragment>
  )
}