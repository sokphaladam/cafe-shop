'use client';
import { PopoverEditControl } from '@/components/custom/PopoverEdit';
import { FormPosition } from '@/components/polaris/form/FormPosition';
import { PolarisLayout, role_permission } from '@/components/polaris/PolarisLayout';
import { useGetPositionListQuery } from '@/gql/graphql';
import { Box, Card, Layout, Spinner } from '@shopify/polaris';
import React, { useState } from 'react';

export function PositionScreen() {
  const [active, setActive] = useState(false);
  const [id, setId] = useState(0);
  const { data, loading } = useGetPositionListQuery({
    variables: {
      offset: 0,
      limit: 1000,
    },
  });

  return (
    <Layout>
      <Layout.Section variant="oneThird">
        <PolarisLayout
          title="Position"
          permission={[role_permission.SUPER_ADMIN, role_permission.ADMIN]}
          fullWidth
          primaryAction={{
            content: 'Create',
            onAction: () => setActive(true),
          }}
        >
          {loading && <Spinner />}
          <FormPosition
            title={`Position ${id > 0 ? '#' + id : ''}`}
            active={active}
            setActive={(v) => {
              setActive(v);
              setId(0);
            }}
            id={id}
          />
          <Card padding={'0'}>
            <Box padding={'0'}>
              {data?.getPositionList?.map((x) => {
                return (
                  <div key={x?.id}>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center p-2 cursor-pointer">
                        <div>
                          <div className="ml-2 font-bold">{x?.name}</div>
                          <div className="mt-1 ml-2 text-gray-600 text-xs">{x?.createdDate}</div>
                        </div>
                      </div>
                      <PopoverEditControl
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
        </PolarisLayout>
      </Layout.Section>
      <Layout.Section variant="oneThird"></Layout.Section>
      <Layout.Section variant="oneThird"></Layout.Section>
    </Layout>
  );
}
