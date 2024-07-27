// lib/apollo-provider.js
"use client";

import { config_app } from "@/lib/config_app";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { getCookie } from "cookies-next";

function makeClient(initialize_token?: string | null) {
  const token = initialize_token
    ? initialize_token
    : getCookie("tk_token");
  const httpLink = new HttpLink({
    uri: config_app.public.assets.url,
    headers: token ? {
      'Authorization': "Bearer " + token
    } : {}
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
        : httpLink,
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={() => makeClient(getCookie("lf_affiliate_token"))}>
      {children}
    </ApolloNextAppProvider>
  );
}