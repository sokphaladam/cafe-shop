'use client';

import { useCheckAttendanceMutation, useGetAttendanceStaffTodayQuery } from '@/gql/graphql';
import { haversineDistance } from '@/lib/loacationDistance';
import { useUser } from '@/service/UserProvider';
import { useSetting } from '@/service/useSettingProvider';
import { Box, Card, Text } from '@shopify/polaris';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';

export function CheckAttandance() {
  const setting = useSetting();
  const user = useUser();
  const [allow, setAllow] = useState(false);
  const { data, loading } = useGetAttendanceStaffTodayQuery({
    variables: {
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    },
  });
  const [attendance] = useCheckAttendanceMutation({
    refetchQueries: ['getAttendanceStaffToday', 'getAttendanceStaff'],
  });

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

        if (Number(km) < 0.08) {
          setAllow(true);
        }
      });
    }
  }, [setting]);

  const handleCheckIn = useCallback(() => {
    const d = new Date();
    attendance({
      variables: {
        userId: Number(user?.id),
        date: moment(d).format('YYYY-MM-DD HH:mm:ss'),
      },
    });
  }, [attendance, user]);

  const handleCheckOut = useCallback(() => {
    const d = new Date();
    attendance({
      variables: {
        userId: Number(user?.id),
        date: moment(d).format('YYYY-MM-DD HH:mm:ss'),
      },
    });
  }, [attendance, user]);

  if (setting.length <= 0 && !user?.id) {
    return <></>;
  }

  const today = moment(new Date()).format('DD-MMM-YYYY');
  const start = setting.find((f) => f.option === 'DEFAULT_STARTWORK')?.value || '0';
  const end = setting.find((f) => f.option === 'DEFAULT_ENDWORK')?.value || '0';
  const break_time = setting.find((f) => f.option === 'DEFAULT_BREAKWORK')?.value;

  if (loading) {
    return <></>;
  }

  return (
    <Card>
      <Box>
        <Text as="h3" variant="headingMd">
          Timesheet {today}
        </Text>
      </Box>
      <br />
      <Box background="bg-fill-secondary" borderRadius="200" padding={'300'} borderColor="input-border-active">
        {data && (
          <div className="flex flex-row justify-between">
            {data?.getAttendanceStaffToday && data?.getAttendanceStaffToday.checkIn && (
              <Text as="h3" variant="headingMd">
                CheckIn ({moment(data?.getAttendanceStaffToday.checkIn).format('LT')})
              </Text>
            )}
            {data?.getAttendanceStaffToday && data?.getAttendanceStaffToday?.checkOut && (
              <Text as="h3" variant="headingMd">
                CheckOut: ({moment(data?.getAttendanceStaffToday.checkOut).format('LT')})
              </Text>
            )}
          </div>
        )}
      </Box>
      <br />
      <Box>
        <div className="flex flex-col items-center justify-between">
          <div className="px-8 py-10 rounded-full border-collapse border-spacing-1 border-[#e2e4e6] border-4 my-5 font-bold text-lg bg-[#f9f9f9]">
            {data
              ? (data?.getAttendanceStaffToday?.checkOut
                  ? moment(data?.getAttendanceStaffToday.checkOut)
                  : moment(new Date())
                ).diff(moment(data?.getAttendanceStaffToday?.checkIn), 'hours') || 0
              : 0}{' '}
            hrs
          </div>
          {!allow && (
            <div className="text-red-800">
              Your current location are out of range cannot allow to check in or check out!
            </div>
          )}
          {!!allow && !data?.getAttendanceStaffToday?.checkIn && (
            <div
              className="bg-emerald-500 p-3 text-white rounded-xl font-bold text-lg cursor-pointer"
              onClick={handleCheckIn}
            >
              Check In
            </div>
          )}
          {!!allow && data && !!data.getAttendanceStaffToday?.checkIn && !data.getAttendanceStaffToday.checkOut && (
            <div
              className="bg-orange-500 p-3 text-white rounded-xl font-bold text-lg cursor-pointer"
              onClick={handleCheckOut}
            >
              Check Out
            </div>
          )}
        </div>
      </Box>
      <Box padding={'300'}>
        <div className="flex flex-row justify-between gap-4">
          <div className="p-2 bg-gray-200 border-gray-300 border-2">Work Start: {start} hrs</div>
          <div className="p-2 bg-gray-200 border-gray-300 border-2">Work End: {end} hrs</div>
          <div className="p-2 bg-gray-200 border-gray-300 border-2">Break: {break_time} hrs</div>
        </div>
      </Box>
    </Card>
  );
}
