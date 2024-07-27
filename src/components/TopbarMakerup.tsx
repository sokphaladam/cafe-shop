"use client";
import React, { useCallback, useState } from "react";
import { IconableAction, TopBar } from "@shopify/polaris";
import { ExitIcon } from "@shopify/polaris-icons";
import { deleteCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/service/UserProvider";

interface Props {
  mobileNavigationActive: any;
  setMobileNavigationActive: any;
}

export function TopbarMarkup(props: Props) {
  const user = useUser();
  const { push, refresh } = useRouter();
  const pathname = usePathname();
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );

  const toggleMobileNavigationActive = useCallback(
    () =>
      props.setMobileNavigationActive(
        (mobileNavigationActive: any) => !mobileNavigationActive
      ),
    [props]
  );

  const userMenuActions: { items: IconableAction[] }[] = [
    {
      items: [
        {
          content: "Logout",
          icon: ExitIcon,
          onAction: async () => {
            await deleteCookie("tk_token");
            await push("/");
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
      name={user?.display || ""}
      detail={''}
      initials={(user?.display || '').split(' ').map(x => x.charAt(0).toUpperCase()).join('')}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );
}