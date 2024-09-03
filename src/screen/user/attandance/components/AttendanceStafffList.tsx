'use client';
import { useGetAttendanceStaffQuery } from '@/gql/graphql';
import { useSetting } from '@/service/useSettingProvider';
import { Card, Box, IndexTable } from '@shopify/polaris';
import moment from 'moment';
import React from 'react';
import { start } from 'repl';

export function AttendanceStaffList() {
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

  const start = setting.find((f) => f.option === 'DEFAULT_STARTWORK')?.value || '0';
  const end = setting.find((f) => f.option === 'DEFAULT_ENDWORK')?.value || '0';

  return (
    <Card padding={'0'}>
      <Box padding={'0'}>
        <IndexTable
          headings={[
            { title: '#' },
            { title: 'Date' },
            { title: 'Check In' },
            { title: 'Check Out' },
            { title: 'Status' },
            { title: 'Overtime' },
          ]}
          loading={loading}
          itemCount={data?.getAttendanceStaff?.length || 0}
          selectable={false}
        >
          {data &&
            data.getAttendanceStaff?.map((x, i) => {
              // const st = moment(new Date()).subtract(5 - i, 'day');
              // const ed = moment(new Date())
              //   .subtract(5 - i, 'day')
              //   .add(8 - i, 'hour');
              // const h = Number(ed.format('HH:mm').replace(':', '.')) - Number(st.format('HH:mm').replace(':', '.'));
              const st = moment(x?.checkIn);
              const ed = moment(x?.checkOut);
              const ovst = moment(x?.overTimeIn);
              const oved = moment(x?.overTimeOut);
              const diffSt = Number(start.replace(':', '.')) - Number(st.format('HH:mm').replace(':', '.'));
              const diffEd = Number(ed.format('HH:mm').replace(':', '.')) - Number(end.replace(':', '.'));
              return (
                <IndexTable.Row key={i} id={i + ''} position={i}>
                  <IndexTable.Cell>{i + 1}</IndexTable.Cell>
                  <IndexTable.Cell>{x?.checkDate}</IndexTable.Cell>
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
                      {moment(x?.checkIn).format('LT')} {diffSt !== 0 && `(${diffSt.toFixed(2)})`}
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
                      {moment(x?.checkOut).format('LT')} {diffEd !== 0 && `(${diffEd.toFixed(2)})`}
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    {ed.diff(st, 'hours')} hrs{' '}
                    {/* <small className={hw - h < 0 ? 'text-red-800' : 'text-green-800'}>
                      {h - hw !== 0 ? `(${(h - hw).toFixed(1)})` : ``}
                    </small> */}
                  </IndexTable.Cell>
                  <IndexTable.Cell>{oved.diff(ovst, 'hours') || 0} hrs</IndexTable.Cell>
                </IndexTable.Row>
              );
            })}
        </IndexTable>
      </Box>
    </Card>
  );
}
