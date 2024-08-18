import { Type_Product, useProductListQuery } from '@/gql/graphql';
import { Autocomplete, Icon, LegacyStack, Tag, TextField, Thumbnail } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

export function UploadIntegration() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
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
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions],
  );

  const verticalContentMarkup =
    selectedOptions.length > 0 ? (
      <LegacyStack spacing="extraTight" alignment="center">
        {selectedOptions.map((option) => {
          const find = data?.productList?.find((f: any) => Number(f.id) === Number(option))
          let tagLabel = '';
          tagLabel = find ? find.title?.replace('_', ' ') + '' : option.replace('_', ' ');
          tagLabel = titleCase(tagLabel);
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
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
        selected={selectedOptions}
        onSelect={setSelectedOptions}
        listTitle='Ingredients'
        textField={textField}
        loading={loading}
      />
      {
        selectedOptions.map(opt => {
          const find = data?.productList?.find((f: any) => Number(f.id) === Number(opt))
          const unit = find ? (find?.sku as any[])[0]?.unit : '';
          return (
            <div className='p-2 flex flex-row gap-2 justify-between items-center' key={opt}>
              <div><Thumbnail alt='' source={find?.images + ''} size='small' /></div>
              <div>
                <TextField disabled autoComplete='off' label labelHidden value={find ? find.title + "" : opt} />
              </div>
              <div className='w-[350px]'>
                <TextField autoComplete='off' label labelHidden placeholder={``} suffix={unit} type='integer' />
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