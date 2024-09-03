'use client';
import { useUserListQuery } from '@/gql/graphql';
import { usePagination } from '@/hook/usePagination';
import { Avatar, Box, Card, Frame, IndexTable, Layout, Loading } from '@shopify/polaris';
import React from 'react';

export function UserListScreen() {
  const { limit, offset, setOffset } = usePagination();
  const { data, loading } = useUserListQuery({
    variables: {
      limit,
      offset,
      roles: [3, 4],
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
                  return (
                    <IndexTable.Row key={user?.id} id={user?.id + ''} position={user?.id || 0}>
                      <IndexTable.Cell>
                        <small>{user?.id}</small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Avatar
                          source={user?.profile || ''}
                          initials={user?.display
                            ?.split(' ')
                            .map((s) => s.charAt(0).toUpperCase())
                            .join('')}
                        />
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <small>{user?.display}</small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <small>{user?.gender}</small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <small>{user?.dob}</small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <small>{user?.contact}</small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <small>{user?.startingAt}</small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <small>{user?.position}</small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <small>
                          {user?.role?.name} ({user?.type ?? 'SYS'})
                        </small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <small>{user?.isActive ? 'Yes' : 'No'}</small>
                      </IndexTable.Cell>
                      <IndexTable.Cell></IndexTable.Cell>
                    </IndexTable.Row>
                  );
                })}
            </IndexTable>
          </Box>
        </Card>
      </Layout.Section>
    </Layout>
  );
}
