'use client';
import { useGetAttendanceStaffQuery } from '@/gql/graphql';
import { useSetting } from '@/service/useSettingProvider';
import { Card, Box, ProgressBar, Text } from '@shopify/polaris';
import moment from 'moment';
import React from 'react';

export function AttendanceStatisc() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const setting = useSetting();
  const { data, loading } = useGetAttendanceStaffQuery({
    variables: {
      limit: 31,
      offset: 0,
      from: moment(firstDay).format('YYYY-MM-DD'),
      to: moment(lastDay).format('YYYY-MM-DD'),
    },
  });

  if (loading) {
    return <></>;
  }

  const start = setting.find((f) => f.option === 'DEFAULT_STARTWORK')?.value || '0';
  const end = setting.find((f) => f.option === 'DEFAULT_ENDWORK')?.value || '0';
  const break_time = setting.find((f) => f.option === 'DEFAULT_BREAKWORK')?.value;

  const hw = Number(end?.replace(':', '.')) - Number(start?.replace(':', '.'));
  const hww = (Number(end?.replace(':', '.')) - Number(start?.replace(':', '.'))) * 7;
  const hwm = (Number(end?.replace(':', '.')) - Number(start?.replace(':', '.'))) * 7 * 4;

  const todayServer = data?.getAttendanceStaff?.find(
    (f) => new Date(f?.checkDate as any).getTime() === new Date(moment(today).format('YYYY-MM-DD')).getTime(),
  );

  const x = (3.45 / hw) * 100;
  const y = (28 / hww) * 100;
  const z = (90 / hwm) * 100;

  return (
    <Card>
      <Box>
        <Text as="h3" variant="headingMd">
          Statistics
        </Text>
      </Box>
      <br />
      <Box background="bg-fill" borderRadius="200" padding={'300'} borderColor="border-secondary" borderWidth="025">
        <div className="flex flex-row justify-between items-center">
          <div>Today</div>
          <div>3.45 / {hw} hrs</div>
        </div>
        <ProgressBar size="small" animated progress={x} tone="success" />
      </Box>
      <br />
      <Box background="bg-fill" borderRadius="200" padding={'300'} borderColor="border-secondary" borderWidth="025">
        <div className="flex flex-row justify-between items-center">
          <div>This Week</div>
          <div>28 / {hww.toFixed(2)} hrs</div>
        </div>
        <ProgressBar size="small" animated progress={y} tone="highlight" />
      </Box>
      <br />
      <Box background="bg-fill" borderRadius="200" padding={'300'} borderColor="border-secondary" borderWidth="025">
        <div className="flex flex-row justify-between items-center">
          <div>This Month</div>
          <div>90 / {hwm.toFixed(2)} hrs</div>
        </div>
        <ProgressBar size="small" animated progress={z} tone="primary" />
      </Box>
      <br />
      <Box background="bg-fill" borderRadius="200" padding={'300'} borderColor="border-secondary" borderWidth="025">
        <div className="flex flex-row justify-between items-center">
          <div>Overtime</div>
          <div>4 / {10}</div>
        </div>
        <ProgressBar size="small" animated progress={(4 / 10) * 100} tone="critical" />
      </Box>
    </Card>
  );
}
