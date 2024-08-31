'use client';

import { UserInput } from '@/gql/graphql';
import { Layout } from '@shopify/polaris';

interface Props {
  user: UserInput;
  setUser: (v: UserInput) => void;
}

export function FormUser(props: Props) {
  return (
    <Layout>
      <Layout.Section></Layout.Section>
    </Layout>
  );
}
