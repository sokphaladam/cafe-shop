'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { setCookie } from "cookies-next";
import { useCustomToast } from '@/components/custom/CustomToast';
import { Telegram } from '@/api/telegram';
import moment from 'moment';
import { Banner, Box, Button, Card, LegacyCard, Text, TextField } from '@shopify/polaris';
import Image from 'next/image';
import { config_app } from '@/lib/config_app';
import { useLoginMutation } from '@/gql/graphql';

export function LoginScreen() {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const { toasts, setToasts } = useCustomToast();
  const [msg, setMsg] = useState<any | null>(null);
  const [checkStatus, setCheckStatus] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [login, { loading }] = useLoginMutation();

  useEffect(() => {
    const telegram = new Telegram();
    telegram.getMe().then(res => {
      setCheckStatus(res.ok);
    });
  }, [])

  const handleClick = useCallback(async () => {
    setToasts([...toasts, {
      content: 'Welcome!',
      status: 'success'
    }]);
    const telegram = new Telegram();
    const str = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    telegram.sendMessage(`<code>Staff login ${str}</code>`)
    setCookie('tk_token', 'TK' + new Date().toTimeString())
    await sleep(1);
    process.browser && window.location.reload();
  }, [setToasts, toasts]);

  const handleLogin = useCallback(() => {
    login({
      variables: {
        username: usernameInput,
        password: passwordInput,
      },
    }).then((res) => {
      setMsg({
        success: !!res.data?.login,
        message: res.data?.login ? "Login success" : 'Fail login'
      });
      setToasts([
        ...toasts,
        {
          content: res.data?.login ? "Login success" : 'Fail login',
          status: res.data?.login ? "success" : 'error',
        },
      ]);
      if (res.data?.login) {
        setCookie("tk_token", res.data.login, {
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
        });
        setTimeout(() => process.browser && window.location.reload(), 500);
      }
    });
  }, [login, passwordInput, setToasts, toasts, usernameInput]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-login overflow-hidden w-screen">
      <div className="w-[500px]">
        {msg?.success === false && (
          <div className="mt-2 mb-2">
            <Banner title="Login failed" tone="critical">
              <p>{msg.message}</p>
            </Banner>
          </div>
        )}
        <Card>
          <Box padding={'0'}>
            <div className="m-10">
              <div className='flex flex-row items-center'>
                <Image
                  alt=""
                  src={config_app.public.assets.logo || "/affiliate.svg"}
                  width={45}
                  height={45}
                  objectFit="container"
                />
                <b className='ml-2 text-[12pt] text-[#674F36]'>Caffe Panel</b>
              </div>
              <div className="mt-10">
                <Text as="h4" variant="headingLg">
                  Log in
                </Text>
              </div>
              <div className="mt-2">
                <Text as="p" variant="bodyLg" tone="subdued">
                  Continue to application
                </Text>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mt-7">
                  <TextField
                    autoComplete="off"
                    label="Username"
                    type="tel"
                    value={usernameInput}
                    onChange={setUsernameInput}
                  // disabled={loading}
                  // error={
                  //   msg?.success === false &&
                  //   msg.message === "Invalid phone number"
                  // }
                  />
                </div>
                <div className="mt-3">
                  <TextField
                    autoComplete="off"
                    label="Password"
                    type="password"
                    value={passwordInput}
                    onChange={setPasswordInput}
                  // disabled={loading}
                  // error={
                  //   msg?.success === false &&
                  //   msg.message === "Invalid password"
                  // }
                  />
                </div>
                <div className="mt-5">
                  <Button
                    fullWidth
                    size="large"
                    onClick={handleLogin}
                    // loading={loading}
                    // disabled={loading}
                    submit
                    tone='success'
                    variant='primary'
                  >
                    Continue with phone number
                  </Button>
                </div>
              </form>
            </div>
          </Box>
        </Card>
      </div>
    </div>
  )
}