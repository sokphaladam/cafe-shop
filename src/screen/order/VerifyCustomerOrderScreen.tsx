'use client';

import { Topbar } from "@/components/Topbar";
import { useVerifyOtpOrderMutation } from "@/gql/graphql";
import { Box, Button, Card, Layout, Page, Text, TextField } from "@shopify/polaris";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  onVerify: (e: boolean) => void;
}

export function VerifyCustomerOrderScreen(props: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [info, setInfo] = useState({
    set: params.get('token') ? params.get('token')?.split('@')[0] : 1,
    name: params.get('token') || "1@" + new Date().getTime(),
    code: params.get('otpCode') || ''
  });

  const [verify] = useVerifyOtpOrderMutation();

  const handleVerify = useCallback(() => {
    verify({
      variables: {
        code: info.code,
        token: params.get('token') || ''
      }
    }).then(res => {
      if (!!res.data?.verifyOtpOrder) {
        const newParams = new URLSearchParams(params.toString())
        newParams.set('otpCode', info.code)
        router.push(path + '?' + newParams.toString())
      }
      props.onVerify && props.onVerify(res.data?.verifyOtpOrder || false)
    })
  }, [info.code, params, path, props, router, verify])

  useEffect(() => {
    if (params.get('token') && params.get('otpCode')) {
      handleVerify()
    }
  }, [handleVerify, info.code, params])

  const check = info.code || info.code.trim().length === 4

  return (
    <div>
      <Topbar isCart={false} />
      <Page>
        <Layout>
          <Layout.Section>
            <div className="p-2">
              <Card>
                <Box>
                  <Text as="h4" variant="headingMd">Verify Code</Text>
                </Box>
                <Box>
                  <br />
                  <TextField
                    focused
                    type="number"
                    value={info.code}
                    onChange={v => {
                      setInfo({
                        ...info,
                        code: v
                      })
                    }}
                    autoComplete="off"
                    label
                    labelHidden
                    maxLength={4}
                  />
                </Box>
                <Box>
                  <br />
                  <Button disabled={!check} tone="success" variant="primary" fullWidth onClick={handleVerify}>Verify</Button>
                </Box>
              </Card>
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  )
}