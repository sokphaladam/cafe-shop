'use client';
import { PolarisLayout, role_permission } from '@/components/polaris/PolarisLayout';
import { useProductListQuery } from '@/gql/graphql';
import { usePagination } from '@/hook/usePagination';
import { Box, Button, Card, IndexTable, Layout } from '@shopify/polaris';
import React, { useState } from 'react';
import { ProductListItem } from './components/ProductListItem';

export function ProductScreen() {
  const { offset, setOffset, limit, setLimit } = usePagination();
  const { data, loading } = useProductListQuery({
    fetchPolicy: 'no-cache',
    variables: {
      offset,
      limit,
    },
  });

  return (
    <PolarisLayout
      title="Products"
      permission={[role_permission.SUPER_ADMIN, role_permission.ADMIN]}
      primaryAction={{
        content: 'Upload Product',
        url: '/products/create',
      }}
    >
      {/* <div className="sticky top-14 right-[16%] h-[50px] bg-gray-100 z-50 flex flex-row justify-between items-center">
        <h4 className="text-[#303030] font-bold text-[19.68px]">Products</h4>
        <div>
          <Button variant="primary" url="/products/create">
            Upload Product
          </Button>
        </div>
      </div> */}
      <Layout>
        <Layout.Section>
          <Card padding={'0'}>
            <Box padding={'0'}>
              <IndexTable
                headings={[
                  { title: '#' },
                  { title: 'Info' },
                  { title: 'Category' },
                  { title: 'SKU' },
                  { title: 'Type' },
                  { title: 'Control' },
                ]}
                loading={loading}
                itemCount={data?.productList?.length || 0}
                selectable={false}
                pagination={{
                  label: `${offset + 1} - ${limit * (offset + 1)}`,
                  hasNext: (data?.productList?.length || 0) >= limit,
                  hasPrevious: offset > 0,
                  onNext: () => setOffset(offset + 1),
                  onPrevious: () => setOffset(offset - 1),
                }}
              >
                {data &&
                  data.productList?.map((x, i) => (
                    <ProductListItem item={x} key={i} index={(i + 1) * (offset === 0 ? 1 : offset)} />
                  ))}
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </PolarisLayout>
  );
}
