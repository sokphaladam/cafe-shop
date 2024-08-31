'use client';
import { Page } from '@shopify/polaris';
import React, { useState } from 'react';
import { FormUser } from './components/FormUser';
import { UserInput } from '@/gql/graphql';

export function CreateUserScreen() {
  const [value, setValue] = useState<UserInput>({});

  return (
    <Page>
      <FormUser user={value} setUser={setValue} />
    </Page>
  );
}
