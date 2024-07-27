import { ActionList, Icon, IndexTable, Popover, TextField, Tooltip } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import { MenuVerticalIcon } from '@shopify/polaris-icons';
import { ProductInput, Sku } from '@/gql/graphql';

interface Props {
  value: ProductInput;
  setValue: (v: ProductInput) => void
}

function UploadProductSkuItem(props: {
  value: ProductInput
  setValue: (v: ProductInput) => void
  current: Sku
  latest: boolean
  index: number
}) {
  const [open, setOpen] = useState(false);

  const handleChangeText = useCallback((v: string, text: string) => {
    let dummy: any = (props.value.sku as any).map((x: any) => {
      return {
        ...x
      }
    })
    dummy[props.index][text] = v;
    props.setValue({
      ...props.value,
      sku: dummy
    })
  }, [props])

  if (!props.value.sku) {
    return <></>
  }

  return (
    <IndexTable.Row id="0" position={0}>
      <IndexTable.Cell>
        <TextField autoComplete='off' label labelHidden size='slim'
          value={props.value.sku[props.index]?.name || ''}
          onChange={v => handleChangeText(v, 'name')}
        />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <TextField autoComplete='off' label labelHidden size='slim' type='number' prefix="$"
          value={props.value.sku[props.index]?.price + ''}
          onChange={v => handleChangeText(v, 'price')}
        />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <TextField autoComplete='off' label labelHidden size='slim' type='number' suffix="%"
          value={props.value.sku[props.index]?.discount + ''}
          onChange={v => handleChangeText(v, 'discount')}
        />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Popover preferredPosition='above' activator={<div className='cursor-pointer' onClick={() => setOpen(!open)}><Icon source={MenuVerticalIcon} /></div>} active={open} onClose={() => setOpen(false)}>
          <Popover.Pane>
            <ActionList
              items={
                [
                  {
                    content: 'Insert row below',
                    onAction: () => {
                      props.setValue({ ...props.value, sku: [...(props.value.sku || []), { name: '', discount: 0, price: 0, unit: '' }] });
                      setOpen(false)
                    },
                    disabled: !props.latest
                  },
                  {
                    content: 'Remove',
                    destructive: true,
                    onAction: () => {
                      props.setValue({ ...props.value, sku: [...(props.value.sku || []).filter((x, i) => i !== props.index)] });
                      setOpen(false)
                    },
                    disabled: (props.value.sku || []).length <= 1
                  }
                ]}
            />
          </Popover.Pane>
        </Popover>
      </IndexTable.Cell>
    </IndexTable.Row>
  )
}

export function UploadProductSku(props: Props) {
  return (
    <IndexTable
      headings={[{ title: 'Name' }, { title: 'Price' }, { title: 'Discount' }, { title: 'control' }]}
      itemCount={1}
      selectable={false}
    >
      {
        (props.value.sku || []).map((x, i) => {
          return (<UploadProductSkuItem current={x || {}} {...props} key={i} latest={(props.value.sku || []).length === i + 1} index={i} />)
        })
      }
    </IndexTable>
  )
}