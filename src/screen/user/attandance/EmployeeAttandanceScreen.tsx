'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Card, IndexTable, Layout, Page, ProgressBar, Text } from '@shopify/polaris';
import { useSetting } from '@/service/useSettingProvider';
import moment from 'moment';
import { haversineDistance } from '@/lib/loacationDistance';

export function EmployeeAttandanceScreen() {
  const setting = useSetting();
  const [checkIn, setCheckInt] = useState<any>(null);
  const [checkOut, setCheckOut] = useState<any>(null);
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    if (process.browser && setting.length > 0) {
      const center = setting.find((f: any) => f?.option === 'LOCATION')?.value;
      navigator.geolocation.getCurrentPosition((msg) => {
        const str: any = center?.split(',');
        const km = haversineDistance(
          Number(str[0]),
          Number(str[1]),
          Number(msg.coords.latitude),
          Number(msg.coords.longitude),
        );

        if (Number(km) < 0.1) {
          setAllow(true);
        }
      });
    }
  }, [setting]);

  const handleCheckIn = useCallback(() => {
    const d = new Date();
    setCheckInt(moment(d));
  }, []);

  const handleCheckOut = useCallback(() => {
    const d = new Date();
    setCheckOut(moment(d));
  }, []);

  if (setting.length <= 0) {
    return <></>;
  }

  const today = moment(new Date()).format('DD-MMM-YYYY');
  const start = setting.find((f) => f.option === 'DEFAULT_STARTWORK')?.value || '0';
  const end = setting.find((f) => f.option === 'DEFAULT_ENDWORK')?.value || '0';
  const break_time = setting.find((f) => f.option === 'DEFAULT_BREAKWORK')?.value;

  const hw = Number(end?.replace(':', '.')) - Number(start?.replace(':', '.'));
  const hww = (Number(end?.replace(':', '.')) - Number(start?.replace(':', '.'))) * 7;
  const hwm = (Number(end?.replace(':', '.')) - Number(start?.replace(':', '.'))) * 7 * 4;

  const x = (3.45 / hw) * 100;
  const y = (28 / hww) * 100;
  const z = (90 / hwm) * 100;

  return (
    <Page title="Attendance" fullWidth>
      <Layout>
        <Layout.Section variant="oneThird">
          <Card>
            <Box>
              <Text as="h3" variant="headingMd">
                Timesheet {today}
              </Text>
            </Box>
            <br />
            <Box background="bg-fill-secondary" borderRadius="200" padding={'300'} borderColor="input-border-active">
              <div className="flex flex-row justify-between">
                {checkIn && (
                  <Text as="h3" variant="headingMd">
                    CheckIn ({checkIn.format('LT')})
                  </Text>
                )}
                {checkOut && (
                  <Text as="h3" variant="headingMd">
                    CheckOut: ({checkOut.format('LT')})
                  </Text>
                )}
              </div>
            </Box>
            <br />
            <Box>
              <div className="flex flex-col items-center justify-between">
                <div className="px-8 py-10 rounded-full border-collapse border-spacing-1 border-[#e2e4e6] border-4 my-5 font-bold text-lg bg-[#f9f9f9]">
                  {(checkOut || moment(new Date())).diff(checkIn, 'hours') || 0} hrs
                </div>
                {!allow && (
                  <div className="text-red-800">
                    Your current location are out of range cannot allow to check in or check out!
                  </div>
                )}
                {!!allow && !checkIn && (
                  <div
                    className="bg-emerald-500 p-3 text-white rounded-xl font-bold text-lg cursor-pointer"
                    onClick={handleCheckIn}
                  >
                    Check In
                  </div>
                )}
                {!!allow && !!checkIn && !checkOut && (
                  <div
                    className="bg-orange-500 p-3 text-white rounded-xl font-bold text-lg cursor-pointer"
                    onClick={handleCheckOut}
                  >
                    Check Out
                  </div>
                )}
              </div>
            </Box>
            <br />
            <Box padding={'300'}>
              <div className="flex flex-row justify-between gap-4">
                <div className="p-2 bg-gray-200 border-gray-300 border-2">Work Start: {start} hrs</div>
                <div className="p-2 bg-gray-200 border-gray-300 border-2">Work End: {end} hrs</div>
                <div className="p-2 bg-gray-200 border-gray-300 border-2">Break: {break_time} hrs</div>
              </div>
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <Box>
              <Text as="h3" variant="headingMd">
                Statistics
              </Text>
            </Box>
            <br />
            <Box
              background="bg-fill"
              borderRadius="200"
              padding={'300'}
              borderColor="border-secondary"
              borderWidth="025"
            >
              <div className="flex flex-row justify-between items-center">
                <div>Today</div>
                <div>3.45 / {hw} hrs</div>
              </div>
              <ProgressBar size="small" animated progress={x} tone="success" />
            </Box>
            <br />
            <Box
              background="bg-fill"
              borderRadius="200"
              padding={'300'}
              borderColor="border-secondary"
              borderWidth="025"
            >
              <div className="flex flex-row justify-between items-center">
                <div>This Week</div>
                <div>28 / {hww.toFixed(2)} hrs</div>
              </div>
              <ProgressBar size="small" animated progress={y} tone="highlight" />
            </Box>
            <br />
            <Box
              background="bg-fill"
              borderRadius="200"
              padding={'300'}
              borderColor="border-secondary"
              borderWidth="025"
            >
              <div className="flex flex-row justify-between items-center">
                <div>This Month</div>
                <div>90 / {hwm.toFixed(2)} hrs</div>
              </div>
              <ProgressBar size="small" animated progress={z} tone="primary" />
            </Box>
            <br />
            <Box
              background="bg-fill"
              borderRadius="200"
              padding={'300'}
              borderColor="border-secondary"
              borderWidth="025"
            >
              <div className="flex flex-row justify-between items-center">
                <div>Overtime</div>
                <div>4 / {10}</div>
              </div>
              <ProgressBar size="small" animated progress={(4 / 10) * 100} tone="critical" />
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <Box>
              <Text as="h3" variant="headingMd">
                Today Activity
              </Text>
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="fullWidth">
          <Card padding={'0'}>
            <Box padding={'0'}>
              <IndexTable
                headings={[
                  { title: '#' },
                  { title: 'Date' },
                  { title: 'Check In' },
                  { title: 'Check Out' },
                  { title: 'Status' },
                  { title: 'Break' },
                  { title: 'Overtime' },
                ]}
                itemCount={1}
                selectable={false}
              >
                {[...new Array(5)].map((_, i) => {
                  const st = moment(new Date()).subtract(5 - i, 'day');
                  const ed = moment(new Date())
                    .subtract(5 - i, 'day')
                    .add(8 - i, 'hour');
                  const h = Number(ed.format('HH:mm').replace(':', '.')) - Number(st.format('HH:mm').replace(':', '.'));
                  return (
                    <IndexTable.Row key={i} id={i + ''} position={i}>
                      <IndexTable.Cell>{i + 1}</IndexTable.Cell>
                      <IndexTable.Cell>
                        {moment(new Date())
                          .subtract(5 - i, 'day')
                          .format('YYYY-MM-DD')}
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <div
                          className={
                            Number(st.format('HH:mm').replace(':', '.')) < Number(start.replace(':', '.') || 0)
                              ? 'text-green-800'
                              : Number(st.format('HH:mm').replace(':', '.')) > Number(start.replace(':', '.') || 0)
                              ? 'text-red-800'
                              : ''
                          }
                        >
                          {st.format('LT')}
                        </div>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <div
                          className={
                            Number(ed.format('HH:mm').replace(':', '.')) > Number(end.replace(':', '.') || 0)
                              ? 'text-green-800'
                              : Number(ed.format('HH:mm').replace(':', '.')) < Number(end.replace(':', '.') || 0)
                              ? 'text-red-800'
                              : ''
                          }
                        >
                          {ed.format('LT')}
                        </div>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        {ed.diff(st, 'hours')} hrs{' '}
                        <small className={hw - h < 0 ? 'text-red-800' : 'text-green-800'}>
                          {h - hw !== 0 ? `(${(h - hw).toFixed(1)})` : ``}
                        </small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>{break_time} hrs</IndexTable.Cell>
                      <IndexTable.Cell>{i === 0 ? '0' : `+${i} hrs`}</IndexTable.Cell>
                    </IndexTable.Row>
                  );
                })}
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
