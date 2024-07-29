import { Telegram } from '@/api/telegram';
import { useOrderContext } from '@/context/OrderContext';
import { Button, ButtonGroup, Divider, Modal, TextField, Thumbnail } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';

export function LayoutCart() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const { items, setItems } = useOrderContext();

  const handleCheckout = useCallback(() => {
    const telegram = new Telegram();
    let text = `<b>Phone Number: ${phone}</b>%0A%0A`

    if (items) {
      const dummy = items.map((x, i) => {
        const sku = x.sku.find((s: any) => s.id === x.sku_id);
        return {
          i: i + 1,
          name: `${x.title}(${sku.name})`,
          qty: x.qty,
          price: `${sku.price}`,
          remark: x.remark ? `(${x.remark})` : ''
        }
      })

      for (let i = 0; i < (dummy || []).length; i++) {
        text = text + `${i + 1}.${dummy[i].name} ✅${dummy[i].qty} 💲${Number(dummy[i].price).toFixed(2)}/1Qty.%0A ${dummy[i].remark}%0A`
      }
      text = text + `%0A%0A<b>Total: 💲${Number(dummy?.reduce((a: any, b: any) => a = a + (b.price * b.qty), 0)).toFixed(2)}</b>`

    }
    telegram.sendMessage(text).then(res => {
      console.log(res)
      setItems && setItems([]);
      setPhone('');
      setOpen(!open);
    }).catch(err => console.log(err));

  }, [items, open, phone, setItems])

  return (
    <div className="w-[30%] bg-white rounded-lg sticky top-0">
      <Modal title="Confirmation" open={open} onClose={() => setOpen(!open)} primaryAction={{
        content: 'Confirm',
        onAction: handleCheckout
      }}>
        <Modal.Section>
          <TextField value={phone} label="Phone number" onChange={setPhone} autoComplete='off' type='number' />
        </Modal.Section>
      </Modal>
      <div>
        {
          items?.map((x, i) => {
            const sku = x.sku.find((s: any) => s.id === x.sku_id);
            return (
              <div key={i} className='p-4'>
                <div className='flex flex-row justify-between items-center'>
                  <div className='flex flex-row'>
                    <Thumbnail source={x.images || ''} alt='' size='medium' />
                    <div className='ml-2'>
                      <b>{x.title}</b>
                      <br />
                      <b>${sku ? sku.price : ''} ({sku.name})</b>
                      <br />
                      {x.addon_value.join(',')}
                    </div>
                  </div>
                  <div>
                    <ButtonGroup variant='segmented'>
                      <Button size='micro' onClick={() => {
                        const dummy = [...items];
                        if (dummy[i].qty === 1) {
                          setItems && setItems(items.filter((_, index) => index !== i))
                          return;
                        }
                        dummy[i].qty = dummy[i].qty - 1;
                        setItems && setItems(dummy)
                      }}>-</Button>
                      <Button disabled size='micro'>{x.qty}</Button>
                      <Button size='micro' onClick={() => {
                        const dummy = [...items];
                        dummy[i].qty = dummy[i].qty + 1;
                        setItems && setItems(dummy)
                      }}>+</Button>
                    </ButtonGroup>
                  </div>
                </div>
                <br />
                <div>
                  Special Request: {x.remark}
                </div>
                <Divider />
              </div>
            )
          })
        }
      </div>
      <div className='p-4 absolute bottom-0 left-0 right-0'>
        <Button variant='primary' tone='critical' fullWidth onClick={() => setOpen(!open)}>Checkout</Button>
      </div>
    </div>
  )
}