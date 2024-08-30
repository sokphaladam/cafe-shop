"use client";
import { Setting, useSettingListQuery } from "@/gql/graphql";
import React, { PropsWithChildren, useContext } from "react";

const SettingContext = React.createContext<Setting[]>([]);

export function useSetting() {
  return useContext(SettingContext);
}

export function SettingProvider(props: PropsWithChildren<unknown>) {
  const { data } = useSettingListQuery();

  return (
    <SettingContext.Provider value={data ? data?.settingList?.map(x => ({ ...x })) || [] : []}>
      {props.children}
    </SettingContext.Provider>
  );
}