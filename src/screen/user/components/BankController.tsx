'use client';

import { useGetbankListQuery } from '@/gql/graphql';
import { Select } from '@shopify/polaris';

export function BankController() {
  const { data, loading } = useGetbankListQuery({
    variables: {
      limit: 1000,
      offset: 0,
    },
  });

  if (loading || !data) {
    return <></>;
  }

  const options = [{ label: 'Select bank', value: '' }];

  for (const d of data.getbankList || []) {
    options.push({
      label: d?.name || '',
      value: d?.name || '',
    });
  }

  return <Select label="Bank Name" disabled={loading} options={options} />;
}
