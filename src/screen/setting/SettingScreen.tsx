'use client';
import { Setting, useSettingListQuery, useUpdateSettingMutation } from '@/gql/graphql';
import { Modal } from '@/hook/modal';
import { google_haversine_distance, haversineDistance } from '@/lib/loacationDistance';
import { Box, Card, IndexTable, Layout, Page, TextField } from '@shopify/polaris';
import React, { useState } from 'react';

function ListTextInput({ setting }: { setting: Setting }) {
  const [value, setValue] = useState(setting.value || '');
  const [edit, setEdit] = useState(false);

  const [update] = useUpdateSettingMutation({
    refetchQueries: ['settingList'],
  });

  return (
    <div
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          setEdit(!edit);
          Modal.dialog({
            title: 'Confirmation',
            body: [<div key={1}>Are you sure want to update value {setting.option}?</div>],
            buttons: [
              {
                title: 'Yes',
                class: 'primary',
                onPress: () => {
                  if (value.trim() !== setting.value?.trim()) {
                    if (!value.trim()) {
                      return;
                    }
                    update({
                      variables: {
                        option: setting.option,
                        value: value,
                      },
                    });
                  }
                },
              },
            ],
          });
        }
      }}
      onDoubleClick={() => setEdit(!edit)}
    >
      {edit ? (
        <TextField
          autoComplete="off"
          value={value}
          label
          labelHidden
          onChange={setValue}
          onBlur={() => {
            setEdit(!edit);
            Modal.dialog({
              title: 'Confirmation',
              body: [<div key={1}>Are you sure want to update value {setting.option}?</div>],
              buttons: [
                {
                  title: 'Yes',
                  class: 'primary',
                  onPress: () => {
                    if (value.trim() !== setting.value?.trim()) {
                      if (!value.trim()) {
                        return;
                      }
                      update({
                        variables: {
                          option: setting.option,
                          value: value,
                        },
                      });
                    }
                  },
                },
              ],
            });
          }}
        />
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}

export function SettingScreen() {
  const { data, loading } = useSettingListQuery();

  const center = data?.settingList?.find((f) => f?.option === 'LOCATION')?.value;

  return (
    <Page
      title="Setting"
      fullWidth
      secondaryActions={[
        {
          content: 'Download service kitchen printer',
          onAction: () => {
            process.browser &&
              window.open(
                'https://firebasestorage.googleapis.com/v0/b/serv-cafe.appspot.com/o/file%2FNew%20folder.rar?alt=media&token=2beb44e4-bb95-4d8b-8861-00cde9651c15',
                '_blank',
              );
          },
        },
        {
          content: 'Check Current Location',
          onAction: () => {
            if (process.browser) {
              navigator.geolocation.getCurrentPosition(
                (msg) => {
                  console.log(msg.coords);
                  const str: any = center?.split(',');
                  const km = haversineDistance(
                    Number(str[0]),
                    Number(str[1]),
                    Number(msg.coords.latitude),
                    Number(msg.coords.longitude),
                  );

                  const mi = google_haversine_distance(
                    {
                      position: { lat: Number(str[0]), lng: Number(str[1]) },
                    },
                    {
                      position: { lat: Number(msg.coords.latitude), lng: Number(msg.coords.longitude) },
                    },
                  );

                  let text =
                    'Current:' + msg.coords.latitude + ',' + msg.coords.longitude + ' (' + km.toFixed(2) + 'km)';

                  if (mi) {
                    text = text + `\n (${mi.toFixed(2)} mi.)`;
                  }

                  alert(text);
                  console.log(km);
                },
                (err) => {
                  alert(err.PERMISSION_DENIED === 1 ? 'Your location cannot access' : '');
                },
              );
            }
          },
        },
      ]}
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <Card padding={'0'}>
            <Box padding={'0'}>
              <IndexTable
                headings={[{ title: '#' }, { title: 'Value' }, { title: 'Type' }]}
                itemCount={data?.settingList?.length || 0}
                selectable={false}
                loading={loading}
              >
                {data &&
                  data.settingList?.map((x, i) => {
                    return (
                      <IndexTable.Row key={x?.option} id={x?.option + ''} position={i}>
                        <IndexTable.Cell>{x?.option}</IndexTable.Cell>
                        <IndexTable.Cell>
                          <ListTextInput setting={x || {}} />
                        </IndexTable.Cell>
                        <IndexTable.Cell>{x?.type}</IndexTable.Cell>
                      </IndexTable.Row>
                    );
                  })}
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird"></Layout.Section>
        <Layout.Section variant="oneThird"></Layout.Section>
      </Layout>
    </Page>
  );
}
