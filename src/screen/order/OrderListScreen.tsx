'use client'
import { StatusOrder, useOrderListQuery, useSubscriptionLoadSubscription } from '@/gql/graphql';
import { usePagination } from '@/hook/usePagination';
import { ActionList, Badge, Box, Card, Icon, IndexFilters, IndexTable, Layout, Page, Popover, TabProps, Tabs, Text, Tooltip, useSetIndexFiltersMode } from '@shopify/polaris';
import { CheckCircleIcon, ClipboardCheckFilledIcon, DeliveryIcon, InfoIcon, MenuVerticalIcon, XCircleIcon } from '@shopify/polaris-icons';
import React, { useState } from 'react';
import { OrderListItem } from './components/OrderListItem';
import { useCustomToast } from '@/components/custom/CustomToast';

const tabs: TabProps[] = [
  {
    content: 'PENDING',
    id: 'PENDING'
  },
  {
    content: 'VERIFY',
    id: 'VERIFY'
  },
  {
    content: 'DELIVER',
    id: 'DELIVERY'
  },
  {
    content: 'CHECKOUT',
    id: 'CHECKOUT'
  },
  {
    content: 'CANCELLED',
    id: 'CANCELLED'
  }
]



export function OrderListScreen() {
  const { setToasts, toasts } = useCustomToast();
  const [select, setSelect] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const { offset, setOffset, limit, setLimit } = usePagination();
  const { mode, setMode } = useSetIndexFiltersMode();
  const { data, loading, refetch } = useOrderListQuery({
    variables: {
      offset,
      limit,
      status: [tabs[select].id as any],
      orderId: searchInput
    }
  });
  useSubscriptionLoadSubscription({
    onData: (res) => {
      refetch();
      setToasts([...toasts, { content: res.data.data?.newOrderPending + '', status: 'info' }])
    }
  });

  return (
    <Page title='Order List'>
      <Layout>
        <Layout.Section>
          <Card padding={'0'}>
            <Box padding={'0'}>
              <IndexFilters
                canCreateNewView={false}
                filters={[]}
                mode={mode}
                setMode={setMode}
                tabs={tabs}
                queryValue={searchInput}
                onClearAll={() => {
                  //
                }}
                onQueryChange={v => {
                  setSearchInput(v);
                }}
                onQueryClear={() => {
                  setSearchInput('')
                }}
                selected={select}
                onSelect={setSelect}
                loading={loading}
                queryPlaceholder='Enter order number...'
              />
            </Box>
            <Box padding={'0'}>
              <IndexTable
                headings={[
                  { title: 'Order' },
                  { title: "Items", alignment: 'center' },
                  { title: "Status", alignment: 'center' },
                  { title: "Qty", alignment: 'end' },
                  { title: "Total", alignment: 'end' },
                  { title: "Paid", alignment: 'end' },
                  { title: 'Note', alignment: 'start' },
                  { title: 'Controls', alignment: 'end' }
                ]}
                loading={loading}
                itemCount={data?.orderList?.length || 0}
                selectable={false}
                pagination={{
                  label: `${offset + 1} - ${limit * (offset + 1)}`,
                  hasNext: (data?.orderList?.length || 0) >= limit,
                  hasPrevious: offset > 0,
                  onNext: () => setOffset(offset + 1),
                  onPrevious: () => setOffset(offset - 1)
                }}
              >
                {
                  data && data.orderList?.map((x, i) => <OrderListItem item={x} key={i} />)
                }
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}