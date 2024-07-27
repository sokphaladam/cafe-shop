import { ProductInput, Type_Product } from '@/gql/graphql';
import { Autocomplete, LegacyStack, Tag } from '@shopify/polaris';
import React, { useCallback, useMemo, useState } from 'react';

interface Props {
  value: ProductInput;
  setValue: (v: ProductInput) => void
}

export function UploadProductType(props: Props) {
  const deselectedOptions = useMemo(
    () => [
      { value: Type_Product.Production, label: Type_Product.Production.toLowerCase() },
      { value: Type_Product.Addon, label: Type_Product.Addon.toLowerCase() },
      { value: Type_Product.Free, label: Type_Product.Free.toLowerCase() },
      { value: Type_Product.Raw, label: Type_Product.Raw.toLowerCase() },
    ],
    [],
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([...(props.value.type as any)]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );

      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const removeTag = useCallback(
    (tag: string) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
      props.setValue({ ...props.value, type: options as any });
    },
    [props, selectedOptions],
  );

  const verticalContentMarkup =
    selectedOptions.length > 0 ? (
      <LegacyStack spacing="extraTight" alignment="center">
        {selectedOptions.map((option) => {
          let tagLabel = '';
          tagLabel = option.replace('_', ' ');
          tagLabel = titleCase(tagLabel);
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        })}
      </LegacyStack>
    ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Type"
      value={inputValue}
      verticalContent={verticalContentMarkup}
      autoComplete="off"
      requiredIndicator
    />
  );

  return (
    <div>
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={v => {
          setSelectedOptions(v);
          props.setValue({ ...props.value, type: v as any })
        }}
        listTitle="Suggested Type"
      />
    </div>
  );

  function titleCase(string: string) {
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join('');
  }
}