"use client";
import { User, useMeQuery } from "@/gql/graphql";
import { usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren, useContext } from "react";

const UserContext = React.createContext<User | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props: PropsWithChildren<unknown>) {
  const pathname = usePathname();
  const { push } = useRouter();
  const { data } = useMeQuery({
    // onCompleted: res => {
    //   const path = "/kitchen/order";
    //   if (res.me?.role?.id === 4 && pathname !== path) {
    //     push(path)
    //   }
    // }
  });

  return (
    <UserContext.Provider value={data?.me || null}>
      {props.children}
    </UserContext.Provider>
  );
}