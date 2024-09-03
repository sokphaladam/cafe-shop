'use client';
import React, { useCallback, useState } from 'react';
import { Icon, IconableAction, Text, TopBar } from '@shopify/polaris';
import { CheckSmallIcon, ExitIcon } from '@shopify/polaris-icons';
import { deleteCookie } from 'cookies-next';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/service/UserProvider';
import { useLanguage } from '@/service/LanguageProvider';

interface Props {
  mobileNavigationActive: any;
  setMobileNavigationActive: any;
}

export function TopbarMarkup(props: Props) {
  const user = useUser();
  const { push, refresh } = useRouter();
  const pathname = usePathname();
  const { lng, setLng } = useLanguage();
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  const toggleUserMenuActive = useCallback(() => setUserMenuActive((userMenuActive) => !userMenuActive), []);

  const toggleMobileNavigationActive = useCallback(
    () => props.setMobileNavigationActive((mobileNavigationActive: any) => !mobileNavigationActive),
    [props],
  );

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    [],
  );

  const userMenuActions: { items: IconableAction[] }[] = [
    {
      items: [
        {
          content: 'Logout',
          icon: ExitIcon,
          onAction: async () => {
            await deleteCookie('tk_token');
            await push('/');
            if (process.browser) {
              setTimeout(() => {
                window.location.reload();
              }, 300);
            }
          },
        },
      ],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={user?.display || ''}
      detail={''}
      initials={(user?.display || '')
        .split(' ')
        .map((x) => x.charAt(0).toUpperCase())
        .join('')}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Text as="span">EN</Text>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [
            {
              content: 'English',
              prefix: lng === 'en' ? <Icon source={CheckSmallIcon} /> : '',
              onAction: () => setLng('en'),
            },
            {
              content: 'Khmer',
              prefix: lng === 'km' ? <Icon source={CheckSmallIcon} /> : '',
              onAction: () => setLng('km'),
            },
          ],
        },
      ]}
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
      secondaryMenu={secondaryMenuMarkup}
    />
  );
}
