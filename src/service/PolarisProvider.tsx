'use client';
import React, { useCallback, useState } from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Page, LegacyCard, Button, Frame } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { config_app } from '@/lib/config_app';
import { TopbarMarkup } from '@/components/TopbarMakerup';
import { NavigationMarkup } from '@/components/NavigationMarkup';
import { TokenVerification } from './TokenProvider';
import Link from 'next/link';

const logo = {
  width: 35,
  topBarSource: config_app.public.assets.logo,
  contextualSaveBarSource: config_app.public.assets.logo,
  url: "/",
  accessibilityLabel: "LOGO",
}

export function PolarisProvider({ children }: React.PropsWithChildren<any>) {
  const [verify, setVerify] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  return (
    <AppProvider
      i18n={enTranslations}
      features={{
        polarisSummerEditions2023: true,
        polarisSummerEditions2023ShadowBevelOptOut: true,
      }}
      linkComponent={({ children, url, ...rest }: { children?: React.ReactNode; url: string }) => {
        return (
          <Link href={url} {...rest}>
            {children}
          </Link>
        );
      }}
    >
      <TokenVerification onCompleted={setVerify} />
      <Frame
        logo={logo}
        topBar={verify ? <TopbarMarkup mobileNavigationActive={mobileNavigationActive} setMobileNavigationActive={setMobileNavigationActive} /> : null}
        showMobileNavigation={mobileNavigationActive && verify}
        onNavigationDismiss={toggleMobileNavigationActive}
        navigation={verify ? <NavigationMarkup /> : null}
      >
        {config_app.public.assets.dev === "development" && (
          <div className="bg-sky-800 w-screen p-1 text-white text-center text-xs fixed left-0 right-0 bottom-0 z-[999]">
            Developer Mode
          </div>
        )}
        {children}
      </Frame>
    </AppProvider>
  )
}