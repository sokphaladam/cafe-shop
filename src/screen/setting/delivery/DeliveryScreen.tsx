'use client';
import { FormDelivery } from '@/components/polaris/form/FormDelivery';
import { useDeliveryListQuery } from '@/gql/graphql';
import { usePagination } from '@/hook/usePagination';
import { ActionList, Box, Card, Icon, IndexTable, Layout, Page, Popover, Spinner } from '@shopify/polaris';
import { MenuVerticalIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

function PopoverControl(props: { id: number; onEdit: any }) {
  const [open, setOpen] = useState(false);

  const toggelOpen = useCallback(() => setOpen(!open), [open]);

  const activator = (
    <div
      className="cursor-pointer hover:bg-gray-300 rounded-full w-[30px] h-[30px] flex flex-row items-center"
      onClick={toggelOpen}
    >
      <Icon source={MenuVerticalIcon} tone="base" />
    </div>
  );

  return (
    <Popover preferredPosition="mostSpace" activator={activator} active={open} onClose={toggelOpen}>
      <ActionList items={[{ content: 'Edit', onAction: () => props.onEdit(props.id) }]} />
    </Popover>
  );
}

export function DeliveryScreen() {
  const [active, setActive] = useState(false);
  const [id, setId] = useState(0);
  const { data, loading } = useDeliveryListQuery({
    variables: {
      offset: 0,
      limit: 1000,
    },
  });

  return (
    <Layout>
      <Layout.Section variant="oneThird">
        <Page title="Delivery" fullWidth primaryAction={{ content: 'Create', onAction: () => setActive(true) }}>
          {loading && <Spinner />}
          <FormDelivery
            title={`Delivery ${id > 0 ? '#' + id : ''}`}
            active={active}
            setActive={(v) => {
              setActive(v);
              setId(0);
            }}
            id={id}
          />
          <Card padding={'0'}>
            <Box padding={'0'}>
              {data?.deliveryList?.map((x) => {
                return (
                  <div key={x?.id}>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center p-2 cursor-pointer">
                        <div>
                          <div className="ml-2 font-bold">{x?.name}</div>
                          <div className="mt-1 ml-2 text-gray-600 text-xs">{x?.contact}</div>
                        </div>
                      </div>
                      <PopoverControl
                        id={x?.id || 0}
                        onEdit={(v: any) => {
                          setId(v);
                          setActive(true);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </Box>
          </Card>
        </Page>
      </Layout.Section>
      <Layout.Section variant="oneThird"></Layout.Section>
      <Layout.Section variant="oneThird"></Layout.Section>
    </Layout>
  );
}
