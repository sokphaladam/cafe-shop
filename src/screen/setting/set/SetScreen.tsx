'use client';

import {
  useGenerateTableSetMutation,
  useGenerateTokenOrderMutation,
  useOrderSubscriptSubscription,
  useTableSetListQuery,
} from '@/gql/graphql';
import { Modal } from '@/hook/modal';
import { Box, Card, Frame, Grid, Layout, Loading, Page, Spinner, Text } from '@shopify/polaris';
import { useCallback } from 'react';

export function SetScreen() {
  const { data, loading, refetch } = useTableSetListQuery({
    variables: {
      offset: 0,
      limit: 1000,
    },
  });
  const [table, propsTable] = useGenerateTableSetMutation({
    refetchQueries: ['tableSetList'],
  });
  const [generate, propsUpdate] = useGenerateTokenOrderMutation({
    refetchQueries: ['tableSetList'],
  });
  useOrderSubscriptSubscription({
    onData: (res) => {
      if (res.data.data?.orderSubscript.status === 2 || !!res.data.data?.orderSubscript.uuid) {
        refetch();
      }
    },
  });

  const handleGenerate = useCallback(
    (value: string) => {
      generate({
        variables: {
          set: Number(value),
        },
      });
    },
    [generate],
  );

  const handleGenerateTable = useCallback(() => {
    const pr = window.prompt('How many table for generate?');

    if (!!pr && !isNaN(Number(pr))) {
      Modal.dialog({
        title: 'Confirmation',
        body: [<div key={1}>Are you sure want to generate {pr} tables?</div>],
        buttons: [
          {
            title: 'Yes',
            class: 'primary',
            onPress: () => {
              table({
                variables: {
                  sets: Number(pr),
                },
              });
            },
          },
        ],
      });
    }
  }, [table]);

  if (loading || propsTable.loading) {
    <Frame>
      <Page title="Table">
        <Loading />
      </Page>
    </Frame>;
  }

  return (
    <Page title="Table" primaryAction={{ content: 'GenerateTable', onAction: handleGenerateTable }}>
      <Layout>
        <Layout.Section>
          <Grid columns={{ xs: 1, sm: 4, md: 4, lg: 6, xl: 6 }}>
            {data &&
              data?.tableSetList?.map((x) => {
                return (
                  <Grid.Cell key={x?.set}>
                    <div
                      className="cursor-pointer"
                      onClick={() => (propsUpdate.loading || x?.order ? {} : handleGenerate(x?.set + ''))}
                    >
                      <Card background={x?.order ? 'bg-fill-success-active' : 'bg-fill'}>
                        <Box>
                          <div className="flex flex-col justify-center items-center">
                            <Text as="h3" variant="bodyLg" fontWeight="bold" tone={x?.order ? 'text-inverse' : 'base'}>
                              {x?.set}
                            </Text>
                            {/* {x?.order && (
                              <Text
                                as="h3"
                                variant="bodyLg"
                                fontWeight="bold"
                                tone={x?.order ? 'text-inverse' : 'base'}
                              >
                                #{x?.order?.code}
                              </Text>
                            )} */}
                            {(propsUpdate.loading || propsTable.loading) && <Spinner size="small" />}
                          </div>
                        </Box>
                      </Card>
                    </div>
                  </Grid.Cell>
                );
              })}
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
