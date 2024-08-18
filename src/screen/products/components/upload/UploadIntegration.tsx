import { ProductInput, Type_Product, useProductListQuery } from '@/gql/graphql';
import { Autocomplete, Icon, LegacyStack, Tag, TextField, Thumbnail } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

interface Props {
  value: ProductInput;
  setValue: (v: ProductInput) => void
}

export function UploadIntegration(props: Props) {
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('');
  const { data, loading } = useProductListQuery({
    variables: {
      offset: 0,
      limit: 10000,
      filter: {
        type: [Type_Product.Raw]
      }
    }
  })

  const removeTag = useCallback(
    (tag: string) => () => {
      const options = [...(props.value.integrate || [])];
      options.splice(options.map(x => x?.integrateId + '').indexOf(tag), 1);
      props.setValue({
        ...props.value,
        integrate: options
      })
    },
    [props],
  );

  const verticalContentMarkup =
    (props.value.integrate || [])?.length > 0 ? (
      <LegacyStack spacing="extraTight" alignment="center">
        {(props.value.integrate || []).map((option) => {
          const find = data?.productList?.find((f: any) => Number(f.id) === Number(option?.integrateId))
          let tagLabel = '';
          tagLabel = find ? find.title?.replace('_', ' ') + '' : option?.integrateId + '';
          tagLabel = titleCase(tagLabel);
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option?.integrateId + '')}>
              {tagLabel}
            </Tag>
          );
        })}
      </LegacyStack>
    ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={v => { }}
      label="Ingredients"
      value={inputValue}
      placeholder="Vintage, cotton, summer"
      verticalContent={verticalContentMarkup}
      autoComplete="off"
    />
  );

  return (
    <div className='flex flex-col gap-1'>
      <Autocomplete
        allowMultiple
        options={
          data ? data?.productList?.map(x => {
            return {
              value: x?.id + '',
              label: x?.title || ''
            }
          }) || [] : []
        }
        selected={props.value.integrate?.map(x => x?.integrateId + '') || []}
        onSelect={v => {
          const dummy = [...(props.value.integrate || [])]
          for (const i of v) {
            const find = dummy.findIndex(f => Number(f?.integrateId) === Number(i));

            if (find < 0) {
              dummy.push({
                integrateId: Number(i),
                qty: '0'
              })
            }
          }

          props.setValue({
            ...props.value,
            integrate: dummy
          })
        }}
        listTitle='Ingredients'
        textField={textField}
        loading={loading}
      />
      {
        (props.value.integrate || []).map((opt, i) => {
          const find = data?.productList?.find((f: any) => Number(f.id) === Number(opt?.integrateId + ''))
          const unit = find ? (find?.sku as any[])[0]?.unit : '';
          return (
            <div className='p-2 flex flex-row gap-2 justify-between items-center' key={i}>
              <div><Thumbnail alt='' source={find?.images + ''} size='small' /></div>
              <div>
                <TextField disabled autoComplete='off' label labelHidden value={find ? find.title + "" : opt?.integrateId + ''} />
              </div>
              <div className='w-[350px]'>
                <TextField autoComplete='off' value={opt?.qty + ""} label labelHidden placeholder={``} suffix={unit} onChange={v => {
                  const dummy = [...(props.value.integrate || [])]
                  if (dummy[i]) {
                    dummy[i].qty = String(v);
                  }
                  console.log(dummy[i])
                  props.setValue({
                    ...props.value,
                    integrate: dummy
                  })
                }} />
              </div>
            </div>
          )
        })
      }
    </div>
  )

  function titleCase(string: string) {
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join('');
  }
}