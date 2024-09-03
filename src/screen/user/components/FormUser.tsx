'use client';

import { UserInput } from '@/gql/graphql';
import { Box, Card, Divider, InlineGrid, Layout, Select, Text, TextField } from '@shopify/polaris';
import Image from 'next/image';
import { BankController } from './BankController';
import { PolarisUpload } from '@/components/polaris/PolarisUpload';
import { RoleController } from './RoleController';
import { PositionController } from './PositionController';

interface Props {
  user: UserInput;
  setUser: (v: UserInput) => void;
}

export function FormUser(props: Props) {
  return (
    <Layout>
      <Layout.Section variant="oneHalf">
        <Card>
          <Text as="h3" variant="headingMd">
            Basic Information
          </Text>
          <br />
          <Box>
            <InlineGrid columns={['oneHalf', 'oneHalf']} gap={'400'}>
              <TextField label="Name" autoComplete="off" placeholder="Full name" />
              <TextField label="Username" autoComplete="off" placeholder="Username for login" />
            </InlineGrid>
            <br />
            <InlineGrid columns={['oneThird', 'oneThird', 'oneThird']} gap={'400'}>
              <TextField label="Contact" autoComplete="off" placeholder="Phone number" />
              <Select
                label="Gender"
                options={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                  { label: 'Other', value: 'Other' },
                ]}
              />
              <TextField label="Date of Birth" autoComplete="off" type="date" />
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
              <BankController />
              <TextField label="Bank Account Number" autoComplete="off" />
              <TextField label="Bank Account Holder" autoComplete="off" />
            </InlineGrid>
          </Box>
          <br />
          <Divider />
          <br />
          <Text as="h3" variant="headingMd">
            Password
          </Text>
          <Box>
            <TextField labelHidden autoComplete="off" label type="password" />
          </Box>
          <br />
          <Text as="h3" variant="headingMd">
            ID Card
          </Text>
          <PolarisUpload
            url={''}
            setUrl={(url) => {
              // setValue({
              //   ...value,
              //   images: url,
              // });
            }}
            onLoading={(v) => {}}
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
                url={''}
                setUrl={(url) => {
                  // setValue({
                  //   ...value,
                  //   images: url,
                  // });
                }}
                onLoading={(v) => {}}
              />
            </div>
            <br />
            <TextField label="Start work" autoComplete="off" type="date" />
            <br />
            <RoleController />
            <br />
            <PositionController />
            <br />
            <TextField label="Base Salary" autoComplete="off" prefix="$" />
            <br />
            <Select
              label="Active"
              options={[
                { label: 'Active', value: 'T' },
                { label: 'Inactive', value: 'F' },
              ]}
            />
          </Box>
        </Card>
      </Layout.Section>
    </Layout>
  );
}
