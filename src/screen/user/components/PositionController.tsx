'use client';

import { useGetPositionListQuery } from '@/gql/graphql';
import { Select } from '@shopify/polaris';

export function PositionController() {
  const { data, loading } = useGetPositionListQuery({
    variables: {
      limit: 1000,
      offset: 0,
    },
  });

  if (loading || !data) {
    return <></>;
  }

  const options = [{ label: 'Select position', value: '' }];

  for (const d of data.getPositionList || []) {
    options.push({ label: d?.name || '', value: d?.id + '' });
  }

  return <Select label="Position" options={options} />;
}
