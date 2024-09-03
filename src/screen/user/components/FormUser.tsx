'use client';

import { UserInput } from '@/gql/graphql';
import {
  Box,
  Button,
  Card,
  Divider,
  Icon,
  InlineGrid,
  Layout,
  Select,
  Spinner,
  Text,
  TextField,
} from '@shopify/polaris';
import Image from 'next/image';
import { BankController } from './BankController';
import { PolarisUpload } from '@/components/polaris/PolarisUpload';
import { RoleController } from './RoleController';
import { PositionController } from './PositionController';
import React, { useState } from 'react';
import { HideIcon, ViewIcon } from '@shopify/polaris-icons';

interface Props {
  user: UserInput;
  setUser: (v: UserInput) => void;
  error: any;
}

export function FormUser(props: Props) {
  const [passwordInput, setPasswordInput] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;

  const checkPwd =
    !!passwordInput.match(lowerCaseLetters) && !!passwordInput.match(upperCaseLetters) && !!passwordInput.match(numbers)
      ? true
      : false;

  return (
    <React.Fragment>
      {loading && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-[999] flex flex-row justify-center items-center bg-slate-50 opacity-50">
          <Spinner />
        </div>
      )}
      <Layout>
        <Layout.Section variant="oneHalf">
          <Card>
            <Text as="h3" variant="headingMd">
              Basic Information
            </Text>
            <br />
            <Box>
              <InlineGrid columns={['oneHalf', 'oneHalf']} gap={'400'}>
                <TextField
                  label="Name"
                  autoComplete="off"
                  placeholder="Full name"
                  value={props.user.display || ''}
                  onChange={(v) => {
                    props.setUser({
                      ...props.user,
                      display: v,
                    });
                  }}
                />
                <TextField
                  label="Username"
                  autoComplete="off"
                  placeholder="Username for login"
                  value={props.user.username || ''}
                  onChange={(v) => {
                    props.setUser({
                      ...props.user,
                      username: v,
                    });
                  }}
                />
              </InlineGrid>
              <br />
              <InlineGrid columns={['oneThird', 'oneThird', 'oneThird']} gap={'400'}>
                <TextField
                  label="Contact"
                  autoComplete="off"
                  placeholder="Phone number"
                  value={props.user.contact || ''}
                  onChange={(v) => {
                    props.setUser({
                      ...props.user,
                      contact: v,
                    });
                  }}
                />
                <Select
                  label="Gender"
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  value={props.user.gender || ''}
                  onChange={(v) => {
                    props.setUser({
                      ...props.user,
                      gender: v,
                    });
                  }}
                />
                <TextField
                  label="Date of Birth"
                  autoComplete="off"
                  type="date"
                  value={props.user.dob || ''}
                  onChange={(v) => {
                    props.setUser({
                      ...props.user,
                      dob: v,
                    });
                  }}
                />
              </InlineGrid>
            </Box>
            <br />
            <Divider />
            <br />
            <Text as="h3" variant="headingMd">
              Bank Information
            </Text>
            <br />
            <Box>
              <InlineGrid columns={['oneThird', 'oneThird', 'oneThird']} gap={'400'}>
                <BankController
                  value={props.user.bankType || ''}
                  onChange={(v: any) => {
                    props.setUser({
                      ...props.user,
                      bankType: v,
                    });
                  }}
                />
                <TextField
                  label="Bank Account Number"
                  autoComplete="off"
                  value={props.user.bankAcc || ''}
                  onChange={(v: any) => {
                    props.setUser({
                      ...props.user,
                      bankAcc: v,
                    });
                  }}
                />
                <TextField
                  label="Bank Account Holder"
                  autoComplete="off"
                  value={props.user.bankName || ''}
                  onChange={(v: any) => {
                    props.setUser({
                      ...props.user,
                      bankName: v,
                    });
                  }}
                />
              </InlineGrid>
            </Box>
            <br />
            <Divider />
            <br />
            <Text as="h3" variant="headingMd">
              Password
            </Text>
            <Box>
              <TextField
                labelHidden
                autoComplete="off"
                label
                type={show ? 'text' : 'password'}
                value={passwordInput}
                onChange={(v) => {
                  setPasswordInput(v);
                  if (v.length >= 8) {
                    if (v.match(lowerCaseLetters) && v.match(upperCaseLetters) && v.match(numbers)) {
                      props.setUser({
                        ...props.user,
                        password: v,
                      });
                    }
                  }
                }}
                error={
                  passwordInput !== ''
                    ? !checkPwd
                      ? 'Your password needs Upper and lower case letters, numbers and a minimum 8 chars. it will save information without change password.'
                      : ''
                    : ''
                }
                suffix={
                  <div className="cursor-pointer" onClick={() => setShow(!show)}>
                    {(<Icon source={show ? HideIcon : ViewIcon} />) as any}
                  </div>
                }
              />
            </Box>
            <br />
            <Text as="h3" variant="headingMd">
              ID Card
            </Text>
            <PolarisUpload
              url={props.user.ownerId || ''}
              setUrl={(url) => {
                props.setUser({
                  ...props.user,
                  ownerId: url,
                });
              }}
              onLoading={setLoading}
            />
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <Box>
              <Text as="h3" variant="headingMd">
                Organization
              </Text>
              <br />
              <div>
                <Text as="p" variant="bodyMd">
                  Profile
                </Text>
                <PolarisUpload
                  url={props.user.profile || ''}
                  setUrl={(url) => {
                    props.setUser({
                      ...props.user,
                      profile: url,
                    });
                  }}
                  onLoading={setLoading}
                />
              </div>
              <br />
              <TextField
                label="Start work"
                autoComplete="off"
                type="date"
                value={props.user.startingAt || ''}
                onChange={(v: any) => {
                  props.setUser({
                    ...props.user,
                    startingAt: v,
                  });
                }}
              />
              <br />
              <RoleController
                value={props.user.roleId}
                onChange={(v: any) => {
                  props.setUser({
                    ...props.user,
                    roleId: v,
                  });
                }}
              />
              <br />
              <PositionController
                value={props.user.position || ''}
                onChange={(v: any) => {
                  props.setUser({
                    ...props.user,
                    position: v,
                  });
                }}
              />
              <br />
              <TextField
                label="Base Salary"
                autoComplete="off"
                prefix="$"
                value={props.user.baseSalary || ''}
                onChange={(v: any) => {
                  props.setUser({
                    ...props.user,
                    baseSalary: v,
                  });
                }}
              />
              <br />
              <Select
                label="Active"
                options={[
                  { label: 'Active', value: 'T' },
                  { label: 'Inactive', value: 'F' },
                ]}
                value={props.user.isActive ? 'T' : 'F'}
                onChange={(v: any) => {
                  props.setUser({
                    ...props.user,
                    isActive: v === 'T' ? true : false,
                  });
                }}
              />
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </React.Fragment>
  );
}
