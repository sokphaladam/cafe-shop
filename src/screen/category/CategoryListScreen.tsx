'use client'
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { useCategoryListQuery } from '@/gql/graphql';
import { ActionList, Box, Card, Icon, Layout, Popover, Spinner } from '@shopify/polaris';
import { FolderDownIcon, FolderIcon, MenuVerticalIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

function PopoverControl(props: { id: number }) {
  const [open, setOpen] = useState(false);

  const toggelOpen = useCallback(() => setOpen(!open), [open])

  const activator = (
    <div className='cursor-pointer hover:bg-gray-300 rounded-full w-[30px] h-[30px] flex flex-row items-center' onClick={toggelOpen}>
      <Icon source={MenuVerticalIcon} tone='base' />
    </div>
  )

  return (
    <Popover preferredPosition='mostSpace' activator={activator} active={open} onClose={toggelOpen}>
      <ActionList
        items={[
          { content: 'Edit', url: `/category/edit/${props.id}` }
        ]}
      />
    </Popover>
  )
}

export function CategoryListScreen() {
  const { data, loading } = useCategoryListQuery();
  const [open, setOpen] = useState(0);

  const loadChidren = (childs: any[], i: number = 2) => {
    const number = i
    return childs.map((ch: any) => {
      return <div key={ch.id}>
        <div className='flex flex-row justify-between'>
          <div className={`flex flex-row items-center p-2 cursor-pointer`} style={{ marginLeft: `${number}rem` }}>
            {/* <div className='border-solid border-l-[0.5px] h-full'></div> */}
            <div><Icon source={ch.id === open ? FolderDownIcon : FolderIcon} /></div>
            <div className='ml-2'>{ch.name}</div>
          </div>
          <PopoverControl id={ch.id} />
        </div>
        {loadChidren(ch.children, i + 2)}
      </div>
    })
  }

  return (
    <Layout>
      <Layout.Section variant='oneThird'>
        <PolarisLayout title='Category List' fullWidth primaryAction={{ content: 'Create', url: '/category/create' }}>
          {loading && <Spinner />}
          <Card>
            <Box>
              {
                data?.categoryList.root.children.map((x: any) => {
                  return (
                    <div key={x.id}>
                      <div className='flex flex-row justify-between'>
                        <div className='flex flex-row items-center p-2 cursor-pointer'>
                          <div><Icon source={x.id === open ? FolderDownIcon : FolderIcon} /></div>
                          <div className='ml-2'>{x.name}</div>
                        </div>
                        <PopoverControl id={x.id} />
                      </div>
                      {loadChidren(x.children)}
                    </div>
                  )
                })
              }
            </Box>
          </Card>
        </PolarisLayout>
      </Layout.Section>
      <Layout.Section variant='oneThird'></Layout.Section>
      <Layout.Section variant='oneThird'></Layout.Section>
    </Layout>
  )
}