'use client';

import { useCustomToast } from '@/components/custom/CustomToast';
import {
  DeliveryInput,
  useCreateDeliveryMutation,
  useDeliveryByIdQuery,
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

export function FormDelivery(props: Props) {
  const { toasts, setToasts } = useCustomToast();
  const [Id, setId] = useState(0);
  const [info, setInfo] = useState<DeliveryInput>();

  useDeliveryByIdQuery({
    skip: !props.id,
    fetchPolicy: 'no-cache',
    variables: {
      deliveryByIdId: Number(props.id),
    },
    onCompleted: (data) => {
      if (data.deliveryById) {
        setInfo(data.deliveryById);
        setId(data.deliveryById?.id || 0);
      }
    },
  });

  const [create, propsCreate] = useCreateDeliveryMutation({
    refetchQueries: ['deliveryList', 'deliveryById'],
  });
  const [update, propsUpdate] = useUpdateDeliveryMutation({
    refetchQueries: ['deliveryList', 'deliveryById'],
  });

  const toggleActive = useCallback(() => {
    props.setActive(!props.active);
    setInfo({});
    setId(0);
  }, [props]);

  const handleSave = useCallback(() => {
    if (!props.id) {
      create({
        variables: {
          data: {
            name: info?.name,
            contact: info?.contact,
          },
        },
      })
        .then((res) => {
          if (res.data?.createDelivery) {
            setToasts([...toasts, { content: 'Create new category.', status: 'success' }]);
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
          data: {
            name: info?.name,
            contact: info?.contact,
          },
          updateDeliveryId: Number(props.id),
        },
      })
        .then((res) => {
          if (res.data?.updateDelivery) {
            setToasts([...toasts, { content: 'Update category #' + props.id, status: 'success' }]);
            toggleActive();
          } else {
            setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
          }
        })
        .catch(() => {
          setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
        });
    }
  }, [props.id, create, info, setToasts, toasts, toggleActive, update]);

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
            value={info?.name || ''}
            onChange={(v) => {
              setInfo({
                ...info,
                name: v,
              });
            }}
            autoComplete="off"
          />
          <TextField
            label="Contact"
            placeholder="Enter phone number..."
            value={info?.contact || ''}
            onChange={(v) => {
              setInfo({
                ...info,
                contact: v,
              });
            }}
            autoComplete="off"
          />
        </InlineGrid>
      </Modal.Section>
    </Modal>
  );
}
