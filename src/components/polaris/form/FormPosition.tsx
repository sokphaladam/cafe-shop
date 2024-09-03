'use client';
import { useCustomToast } from '@/components/custom/CustomToast';
import { useCreatePositionMutation, usePositionQuery, useUpdatePositionMutation } from '@/gql/graphql';
import { InlineGrid, Modal, TextField } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';

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

export function FormPosition(props: Props) {
  const { toasts, setToasts } = useCustomToast();
  const [Id, setId] = useState(0);
  const [nameInput, setNameInput] = useState('');

  usePositionQuery({
    skip: !props.id,
    fetchPolicy: 'no-cache',
    variables: {
      positionId: Number(props.id),
    },
    onCompleted: (data) => {
      if (data.position) {
        setNameInput(data.position.name || '');
        setId(data.position?.id || 0);
      }
    },
  });

  const [create, propsCreate] = useCreatePositionMutation({
    refetchQueries: ['getPositionList', 'position'],
  });

  const [update, propsUpdate] = useUpdatePositionMutation({
    refetchQueries: ['getPositionList', 'position'],
  });

  const toggleActive = useCallback(() => {
    props.setActive(!props.active);
    setNameInput('');
    setId(0);
  }, [props]);

  const handleSave = useCallback(() => {
    if (!props.id) {
      create({
        variables: {
          name: nameInput.trim(),
        },
      })
        .then((res) => {
          if (res.data?.createPosition) {
            setToasts([...toasts, { content: 'Create new position.', status: 'success' }]);
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
          updatePositionId: Number(props.id),
        },
      })
        .then((res) => {
          if (res.data?.updatePosition) {
            setToasts([...toasts, { content: 'Update position #' + props.id, status: 'success' }]);
            toggleActive();
          } else {
            setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
          }
        })
        .catch(() => {
          setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
        });
    }
  }, [props.id, create, nameInput, setToasts, toasts, toggleActive, update]);

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
        <TextField
          label="Position Name"
          placeholder="Enter position name..."
          value={nameInput}
          onChange={setNameInput}
          autoComplete="off"
        />
      </Modal.Section>
    </Modal>
  );
}
