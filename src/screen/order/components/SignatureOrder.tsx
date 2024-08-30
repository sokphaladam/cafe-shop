'use client';

import { useCustomToast } from '@/components/custom/CustomToast';
import { Order, useSignatureOrderMutation } from '@/gql/graphql';
import { Button, InlineGrid, InlineStack, Modal, TextField } from '@shopify/polaris';
import { useCallback, useState } from 'react';

interface Props {
  order?: Order;
  size?: 'micro' | 'slim' | 'medium' | 'large' | undefined;
}

export function SignatureOrder(props: Props) {
  const [open, setOpen] = useState(false);
  const { setToasts, toasts } = useCustomToast();
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInputError, setUsernameInputError] = useState('');
  const [passwordInputError, setPasswordInputError] = useState('');

  const [signature] = useSignatureOrderMutation({
    refetchQueries: ['order', 'orderList'],
  });

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const handleSignature = useCallback(() => {
    if (!!usernameInput.trim() && !!passwordInput.trim()) {
      signature({
        variables: {
          username: usernameInput,
          password: passwordInput,
          signatureOrderId: Number(props.order?.id),
        },
      })
        .then((res) => {
          if (!!res.data?.signatureOrder) {
            setToasts([...toasts, { content: 'Signature order was done!', status: 'success' }]);
            toggleOpen();
            setUsernameInput('');
            setPasswordInput('');
          } else {
            setToasts([
              ...toasts,
              {
                content: 'Oop! somthing was wrong please try to check your username and password again!',
                status: 'error',
              },
            ]);
          }
        })
        .catch(() => {
          setToasts([...toasts, { content: 'Oop! somthing was wrong please try!', status: 'error' }]);
        });
    }
  }, [passwordInput, props.order?.id, setToasts, signature, toasts, toggleOpen, usernameInput]);

  const isSignature = (props.order?.log?.filter((f) => f?.text?.toLowerCase() === 'signature').length || 0) > 0;

  const activator = isSignature ? (
    <></>
  ) : (
    <Button size={props.size} onClick={() => toggleOpen()}>
      Signature
    </Button>
  );

  return (
    <Modal
      title="Verification confirmation"
      open={open}
      onClose={() => {
        setUsernameInput('');
        setPasswordInput('');
        toggleOpen();
      }}
      activator={activator}
      primaryAction={{
        content: 'Send',
        disabled: !usernameInput.trim() || !passwordInput.trim(),
        onAction: handleSignature,
      }}
    >
      <Modal.Section>
        <InlineGrid columns={2} gap={'400'}>
          <TextField
            value={usernameInput}
            onBlur={() =>
              !usernameInput.trim() ? setUsernameInputError('Plase input username') : setUsernameInputError('')
            }
            error={usernameInputError}
            onChange={setUsernameInput}
            requiredIndicator
            focused
            autoComplete="off"
            label="Username"
          />
          <TextField
            value={passwordInput}
            onBlur={() =>
              !passwordInput.trim() ? setPasswordInputError('Plase input password') : setPasswordInputError('')
            }
            error={passwordInputError}
            type="password"
            onChange={setPasswordInput}
            requiredIndicator
            autoComplete="off"
            label="Password"
          />
        </InlineGrid>
      </Modal.Section>
    </Modal>
  );
}
