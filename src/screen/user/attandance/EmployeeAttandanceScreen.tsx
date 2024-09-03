'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Card, IndexTable, Layout, Page, ProgressBar, Text } from '@shopify/polaris';
import { useSetting } from '@/service/useSettingProvider';
import moment from 'moment';
import { haversineDistance } from '@/lib/loacationDistance';
import { CheckAttandance } from './components/CheckAttandance';
import { AttendanceStatisc } from './components/AttendanceStatiscs';
import { AttendanceStaffList } from './components/AttendanceStafffList';

export function EmployeeAttandanceScreen() {
  return (
    <Page title="Attendance" fullWidth>
      <Layout>
        <Layout.Section variant="oneThird">
          <CheckAttandance />
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <AttendanceStatisc />
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <Box>
              <Text as="h3" variant="headingMd">
                Activity
              </Text>
            </Box>
            <Box>Coming soon...</Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="fullWidth">
          <AttendanceStaffList />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
