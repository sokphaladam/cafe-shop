"use client";
import { User, useMeQuery } from "@/gql/graphql";
import React, { PropsWithChildren, useContext } from "react";

const UserContext = React.createContext<User | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props: PropsWithChildren<unknown>) {
  const { data } = useMeQuery();

  return (
    <UserContext.Provider value={data?.me || null}>
      {props.children}
    </UserContext.Provider>
  );
}