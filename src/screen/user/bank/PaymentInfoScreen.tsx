'use client';
import { PopoverEditControl } from '@/components/custom/PopoverEdit';
import { FormBank } from '@/components/polaris/form/FormBank';
import { PolarisLayout, role_permission } from '@/components/polaris/PolarisLayout';
import { useGetbankListQuery } from '@/gql/graphql';
import { Box, Card, Layout, Spinner } from '@shopify/polaris';
import React, { useState } from 'react';

export function PaymentInfoScreen() {
  const [active, setActive] = useState(false);
  const [id, setId] = useState(0);
  const { data, loading } = useGetbankListQuery({
    variables: {
      offset: 0,
      limit: 1000,
    },
  });

  return (
    <Layout>
      <Layout.Section variant="oneThird">
        <PolarisLayout
          title="Payment Info"
          permission={[role_permission.SUPER_ADMIN, role_permission.ADMIN]}
          fullWidth
          primaryAction={{
            content: 'Create',
            onAction: () => setActive(true),
          }}
        >
          {loading && <Spinner />}
          <FormBank
            title={`Bank Info ${id > 0 ? '#' + id : ''}`}
            active={active}
            setActive={(v) => {
              setActive(v);
              setId(0);
            }}
            id={id}
          />
          <Card padding={'0'}>
            <Box padding={'0'}>
              {data?.getbankList?.map((x) => {
                return (
                  <div key={x?.id}>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center p-2 cursor-pointer">
                        <div>
                          <div className="ml-2 font-bold">{x?.name}</div>
                          <div className="mt-1 ml-2 text-gray-600 text-xs">{x?.phone}</div>
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
