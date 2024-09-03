'use client';

import { useCustomToast } from '@/components/custom/CustomToast';
import {
  DeliveryInput,
  useBankInfoQuery,
  useCreateBankMutation,
  useCreateDeliveryMutation,
  useDeliveryByIdQuery,
  useUpdateBankMutation,
  useUpdateDeliveryMutation,
} from '@/gql/graphql';
import { InlineGrid, Modal, TextField } from '@shopify/polaris';
import { useCallback, useState } from 'react';

interface Props {
  id?: number;
  title: string;
  active: boolean;
  setActive: (active: boolean) => void;
  activator?:
    | React.RefObject<HTMLElement>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
}

export function FormBank(props: Props) {
  const { toasts, setToasts } = useCustomToast();
  const [Id, setId] = useState(0);
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  useBankInfoQuery({
    skip: !props.id,
    fetchPolicy: 'no-cache',
    variables: {
      bankInfoId: Number(props.id),
    },
    onCompleted: (data) => {
      if (data.bankInfo) {
        setNameInput(data.bankInfo.name || '');
        setPhoneInput(data.bankInfo.phone || '');
        setId(data.bankInfo?.id || 0);
      }
    },
  });

  const [create, propsCreate] = useCreateBankMutation({
    refetchQueries: ['getbankList', 'bankInfo'],
  });
  const [update, propsUpdate] = useUpdateBankMutation({
    refetchQueries: ['getbankList', 'bankInfo'],
  });

  const toggleActive = useCallback(() => {
    props.setActive(!props.active);
    setNameInput('');
    setPhoneInput('');
    setId(0);
  }, [props]);

  const handleSave = useCallback(() => {
    if (!props.id) {
      create({
        variables: {
          name: nameInput.trim(),
          phone: phoneInput.trim(),
        },
      })
        .then((res) => {
          if (res.data?.createBank) {
            setToasts([...toasts, { content: 'Create new bank.', status: 'success' }]);
            toggleActive();
          } else {
            setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
          }
        })
        .catch(() => {
          setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
        });
    } else {
      update({
        variables: {
          name: nameInput.trim(),
          phone: phoneInput.trim(),
          updateBankId: Number(props.id),
        },
      })
        .then((res) => {
          if (res.data?.updateBank) {
            setToasts([...toasts, { content: 'Update bank #' + props.id, status: 'success' }]);
            toggleActive();
          } else {
            setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
          }
        })
        .catch(() => {
          setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
        });
    }
  }, [props.id, create, nameInput, phoneInput, setToasts, toasts, toggleActive, update]);

  return (
    <Modal
      open={props.active}
      onClose={toggleActive}
      title={props.title}
      activator={props.activator}
      primaryAction={{
        content: 'Save',
        onAction: handleSave,
        disabled: propsCreate.loading,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: toggleActive,
          disabled: propsCreate.loading,
        },
      ]}
    >
      <Modal.Section>
        <InlineGrid columns={['twoThirds', 'oneThird']} gap={'200'}>
          <TextField
            label="Name"
            placeholder="Enter delivery name..."
            value={nameInput}
            onChange={setNameInput}
            autoComplete="off"
          />
          <TextField
            label="Contact"
            placeholder="Enter phone number..."
            value={phoneInput}
            onChange={setPhoneInput}
            autoComplete="off"
          />
        </InlineGrid>
      </Modal.Section>
    </Modal>
  );
}
