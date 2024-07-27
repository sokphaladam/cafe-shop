'use client';
import { Role } from '@/gql/graphql';
import { useUser } from '@/service/UserProvider';
import { Banner, Layout, Page, PageProps } from '@shopify/polaris';
import React from 'react';

export enum role_permission {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  USER = 3
}

interface Props extends PageProps {
  permission?: role_permission[];
  children?: React.ReactNode | undefined;
}

export function PolarisLayout(props: Props) {
  const user = useUser();

  const block = (
    <Banner title='Permission deined' tone='critical'>
      <p>your current role was not access here !</p>
    </Banner>
  )

  return (
    <Page {...props}>
      {props.permission ?
        <React.Fragment>
          {!!props.permission.includes(user?.role?.id || 0) ? props.children : <Layout>
            <Layout.Section>
              {block}
            </Layout.Section>
          </Layout>}
        </React.Fragment> : props.children}
    </Page>
  )
}