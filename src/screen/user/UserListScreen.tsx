'use client';
import { useUserListQuery } from '@/gql/graphql';
import { usePagination } from '@/hook/usePagination';
import { ActionList, Avatar, Box, Card, Frame, IndexTable, Layout, Loading, Popover } from '@shopify/polaris';
import React from 'react';
import { UserListItem } from './components/UserListItem';

export function UserListScreen() {
  const { limit, offset, setOffset } = usePagination();
  const { data, loading } = useUserListQuery({
    variables: {
      limit,
      offset,
    },
  });

  if (loading) {
    return (
      <Frame>
        <Loading />
      </Frame>
    );
  }

  return (
    <Layout>
      <Layout.Section>
        <Card padding={'0'}>
          <Box padding={'0'}>
            <IndexTable
              headings={[
                { title: '#' },
                { title: 'Profile' },
                { title: 'Staff Name' },
                { title: 'Gender' },
                { title: 'Date of Birth' },
                { title: 'Phone number' },
                { title: 'Start Work Date' },
                { title: 'Position' },
                { title: 'Role' },
                { title: 'Active' },
                { title: 'Controls' },
              ]}
              itemCount={data?.userList?.length || 0}
              loading={loading}
              selectable={false}
              pagination={{
                label: `${offset + 1} - ${limit * (offset + 1)}`,
                hasNext: (data?.userList?.length || 0) >= limit,
                hasPrevious: offset > 0,
                onNext: () => setOffset(offset + 1),
                onPrevious: () => setOffset(offset - 1),
              }}
            >
              {data &&
                data?.userList?.map((user) => {
                  return <UserListItem user={{ ...user, id: user?.id || 0 }} key={user?.id} />;
                })}
            </IndexTable>
          </Box>
        </Card>
      </Layout.Section>
    </Layout>
  );
}
