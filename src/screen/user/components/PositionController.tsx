'use client';

import { useGetPositionListQuery } from '@/gql/graphql';
import { Select } from '@shopify/polaris';

interface Props {
  value: any;
  onChange: any;
}

export function PositionController(props: Props) {
  const { data, loading } = useGetPositionListQuery({
    fetchPolicy: 'cache-and-network',
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
    options.push({ label: d?.name || '', value: d?.name + '' });
  }

  return <Select label="Position" options={options} value={props.value} onChange={props.onChange} />;
}
