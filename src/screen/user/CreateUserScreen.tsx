/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { FormUser } from './components/FormUser';
import { useCreateUserMutation, UserInput } from '@/gql/graphql';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { useCustomToast } from '@/components/custom/CustomToast';
import moment from 'moment';
import { useRouter } from 'next/navigation';

export function CreateUserScreen() {
  const { toasts, setToasts } = useCustomToast();
  const { push } = useRouter();
  const [value, setValue] = useState<UserInput>({
    gender: 'Male',
    isActive: true,
    display: '',
    bankAcc: '',
    bankName: '',
    bankType: '',
    baseSalary: '',
    contact: '',
    dob: '',
    ownerId: '',
    position: '',
    profile: '',
    startingAt: '',
    roleId: undefined,
    username: '',
    password: '',
  });
  const [error, setError] = useState<any>([]);
  const [create] = useCreateUserMutation({
    refetchQueries: ['userList', 'user'],
  });

  const allow = ['bankName', 'bankType', 'bankAcc', 'createdDate', 'type', 'isActive'];

  const checkValid = useCallback(() => {
    const x = [];
    for (const v of Object.keys(value).filter((x) => !allow.includes(x))) {
      if (!(value as any)[v] || (value as any)[v] === '') {
        x.push({ field: v, msg: `Field require` });
      }
    }

    if (x.length > 0) {
      setError(x);
    }
    return x;
  }, [value, allow]);

  useEffect(() => {
    checkValid();
  }, [checkValid]);

  const handleSave = useCallback(() => {
    const err = checkValid();

    if (err.length > 0) {
      for (const e of err) {
        setToasts([...toasts, { content: e.msg, status: 'error' }]);
      }
      return;
    }

    const input: UserInput = {
      gender: value.gender,
      isActive: value.isActive,
      display: value.display,
      bankAcc: value.bankAcc,
      bankName: value.bankName,
      bankType: value.bankType,
      baseSalary: value.baseSalary,
      contact: value.contact,
      dob: value.dob,
      ownerId: value.ownerId,
      position: value.position,
      profile: value.profile,
      startingAt: value.startingAt,
      roleId: Number(value.roleId),
      username: value.username,
      password: value.password ? value.password : undefined,
      createdDate: moment(new Date()).format('YYYY-MM-DD'),
      type: 'STAFF',
    };

    create({
      variables: {
        data: input,
      },
    })
      .then((res) => {
        if (res.data?.createUser) {
          setToasts([...toasts, { content: 'Create new staff', status: 'success' }]);
          push('/staff');
        } else {
          setToasts([...toasts, { content: 'Oop! somthing was wrong please try again!', status: 'error' }]);
        }
      })
      .catch(() => {
        setToasts([...toasts, { content: 'Oop! somthing was wrong please try again!', status: 'error' }]);
      });
  }, [checkValid, create, setToasts, toasts, value, push]);

  const x = [];
  for (const v of Object.keys(value).filter((x) => !allow.includes(x))) {
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
      <FormUser user={value} setUser={setValue} error={error} />
    </PolarisLayout>
  );
}
