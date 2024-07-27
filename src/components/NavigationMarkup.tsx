"use client";
import React from "react";
import { Navigation } from "@shopify/polaris";
import { usePathname, useRouter } from "next/navigation";
import { MenuItems } from "@/lib/MenuItems";
import { useUser } from "@/service/UserProvider";

export function NavigationMarkup() {
  const user = useUser();
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <Navigation location="/">
      {MenuItems(user).map((item, index) => {
        return (
          <Navigation.Section
            separator={index > 0}
            key={index}
            title={item.title}
            items={item.items.map((x: any) => {
              return {
                label: x.label,
                icon: x.icon as any,
                onClick: () => push(x.url || ""),
                exactMatch: true,
                matches: pathname === x.url,
              };
            })}
          />
        );
      })}
    </Navigation>
  );
}