import { Product } from '@/gql/graphql';
import { ActionList, Badge, Icon, IndexTable, Popover, Text, Thumbnail } from '@shopify/polaris';
import react, { useCallback, useState } from 'react';
import { ProductListItemSku } from './ProductListItemSku';
import { MenuVerticalIcon } from '@shopify/polaris-icons';

interface Props {
  item: Product | null
  index: number
}

export function ProductListItem({ item, index }: Props) {
  const [open, setOpen] = useState(false);

  const toggelOpen = useCallback(() => setOpen(!open), [open])

  return (
    <IndexTable.Row id={item?.id + ""} position={item?.id || 0}>
      <IndexTable.Cell className='flex flex-row items-center'>
        <Text as='span' variant='bodyMd'>{index}</Text>
        <div className='pl-2 text-center'>
          <Thumbnail alt='' source={item?.images?.split(',')[0] || ''} size='medium' />
          <Text as='p' variant='bodyMd' fontWeight='semibold'>{item?.code}</Text>
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as='p' variant='bodySm' truncate>{item?.title}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as='p' variant='bodyMd'>{item?.category?.name}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <ProductListItemSku sku={item?.sku || []} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <div className='max-w-[75px]'>
          {
            item?.type?.map(ty => {
              return <div key={ty} className='m-1'>
                <Badge size='small' tone='enabled' progress='complete'>{ty + ''}</Badge>
              </div>
            })
          }
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Popover activator={<div className='cursor-pointer hover:bg-gray-300 rounded-full w-[30px] h-[30px] flex flex-row items-center' onClick={toggelOpen}><Icon source={MenuVerticalIcon} tone='base' /></div>} active={open} onClose={toggelOpen}>
          <ActionList
            items={[
              { content: 'Edit', url: `/products/edit/${item?.id}` }
            ]}
          />
        </Popover>
      </IndexTable.Cell>
    </IndexTable.Row>
  )
}