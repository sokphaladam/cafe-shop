'use client';

import { useUserListQuery } from '@/gql/graphql';
import { Autocomplete, Avatar, Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useCallback, useState } from 'react';

interface Props {
  id: number;
  onChange: (id: number) => void;
  title?: string;
}

export function PolarisUser(props: Props) {
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<any[]>([]);
  const { data, loading } = useUserListQuery({
    variables: {
      offset: 0,
      limit: 10000,
    },
    onCompleted: (res) => {
      setOptions(
        (res.userList || []).map((x) => ({
          value: x?.id + '',
          label: (
            <div className="flex flex-row items-center gap-4">
              <Avatar initials={x?.display?.charAt(0)} source={x?.profile + ''} />
              <div>{x?.display + ''}</div>
            </div>
          ),
          id: x?.display + '',
        })),
      );
    },
  });

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(
          (data?.userList || []).map((x) => ({
            value: x?.id + '',
            label: (
              <div className="flex flex-row items-center gap-4">
                <Avatar initials={x?.display?.charAt(0)} source={x?.profile + ''} />
                <div>{x?.display + ''}</div>
              </div>
            ),
            id: x?.display + '',
          })),
        );
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions: any = data?.userList?.filter((option) => option?.display?.match(filterRegex));
      setOptions(
        resultOptions.map((x: any) => ({
          value: x?.id + '',
          label: (
            <div className="flex flex-row items-center gap-4">
              <Avatar initials={x?.display?.charAt(0)} source={x?.profile + ''} />
              <div>{x?.display + ''}</div>
            </div>
          ),
          id: x?.display + '',
        })),
      );
    },
    [data],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.id;
      });

      // setSelectedOptions(selected);
      props.onChange(Number(selected[0]));
      setInputValue(selectedValue[0] || '');
    },
    [options, props],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label={props.title ? props.title : 'User'}
      value={inputValue}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <Autocomplete
      loading={loading}
      options={options}
      selected={[props.id + '']}
      onSelect={updateSelection}
      textField={textField}
    />
  );
}
