'use client';
import { Page } from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';
import { FormUser } from './components/FormUser';
import { UserInput, useUpdateUserMutation, useUserQuery } from '@/gql/graphql';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import moment from 'moment';
import { useCustomToast } from '@/components/custom/CustomToast';
import { useParams, useRouter } from 'next/navigation';

export function EditUserScreen() {
  const { toasts, setToasts } = useCustomToast();
  const { push } = useRouter();
  const params = useParams<{ id: string }>();
  const [value, setValue] = useState<UserInput | null>(null);
  const [error, setError] = useState<any>([]);
  const { data, loading } = useUserQuery({
    variables: {
      userId: Number(params.id),
    },
    onCompleted: (res) => {
      if (res.user) {
        const u = res.user;
        setValue({
          gender: u.gender,
          isActive: u.isActive,
          display: u.display,
          bankAcc: u.bankAcc,
          bankName: u.bankName,
          bankType: u.bankType,
          baseSalary: u.baseSalary,
          contact: u.contact,
          dob: u.dob,
          ownerId: u.ownerId,
          position: u.position,
          profile: u.profile,
          startingAt: u.startingAt,
          roleId: u.role ? u.role.id : undefined,
          username: u.username,
          password: '',
        });
      }
    },
  });
  const [update] = useUpdateUserMutation({
    refetchQueries: ['userList', 'user'],
  });

  const allow = ['bankName', 'bankType', 'bankAcc', 'password', 'createdDate', 'type', 'isActive'];

  const checkValid = useCallback(() => {
    const x = [];
    for (const v of Object.keys(value as any).filter((x) => !allow.includes(x))) {
      if (!(value as any)[v] || (value as any)[v] === '') {
        x.push({ field: v, msg: `Field require` });
      }
    }

    if (x.length > 0) {
      setError(x);
    }
    return x;
  }, [value, allow]);

  const handleSave = useCallback(() => {
    const err = checkValid();

    if (err.length > 0) {
      for (const e of err) {
        setToasts([...toasts, { content: e.msg, status: 'error' }]);
      }
      return;
    }

    const input: UserInput = {
      gender: value?.gender,
      isActive: value?.isActive,
      display: value?.display,
      bankAcc: value?.bankAcc,
      bankName: value?.bankName,
      bankType: value?.bankType,
      baseSalary: value?.baseSalary,
      contact: value?.contact,
      dob: value?.dob,
      ownerId: value?.ownerId,
      position: value?.position,
      profile: value?.profile,
      startingAt: value?.startingAt,
      roleId: Number(value?.roleId),
      username: value?.username,
      password: value?.password ? value.password : undefined,
      createdDate: moment(new Date()).format('YYYY-MM-DD'),
      type: 'STAFF',
    };

    update({
      variables: {
        data: input,
        id: Number(params.id),
      },
    })
      .then((res) => {
        if (res.data?.updateUser) {
          setToasts([...toasts, { content: 'Update staff', status: 'success' }]);
          push('/staff');
        } else {
          setToasts([...toasts, { content: 'Oop! somthing was wrong please try again!', status: 'error' }]);
        }
      })
      .catch(() => {
        setToasts([...toasts, { content: 'Oop! somthing was wrong please try again!', status: 'error' }]);
      });
  }, [checkValid, update, setToasts, toasts, value, push, params]);

  useEffect(() => {
    if (value) {
      checkValid();
    }
  }, [checkValid, value]);

  if (loading || !data || !value) {
    return <></>;
  }

  const x = [];
  for (const v of Object.keys(value as any).filter((x) => !allow.includes(x))) {
    if (!(value as any)[v] || (value as any)[v] === '') {
      x.push({ field: v, msg: `Field require` });
    }
  }

  return (
    <PolarisLayout
      title="Create Staff"
      fullWidth={false}
      primaryAction={{ content: 'Save', onAction: handleSave, disabled: x.length > 0 }}
    >
      {value && <FormUser user={value} setUser={setValue} error={error} />}
    </PolarisLayout>
  );
}
