// lib/apollo-provider.js
"use client";

import { config_app } from "@/lib/config_app";
import { ApolloLink, HttpLink, split } from "@apollo/client";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  ApolloNextAppProvider
} from "@apollo/experimental-nextjs-app-support/ssr";
import { getCookie } from "cookies-next";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from "@apollo/client/utilities";

let previousWsClient: GraphQLWsLink | null = null;

function makeClient(initialize_token?: string | null) {
  const token = initialize_token ? initialize_token : getCookie("tk_token");
  const httpLink = new HttpLink({
    uri: config_app.public.assets.url + "?token=" + (token ? token : ''),
    headers: token
      ? {
        Authorization: "Bearer " + (token ? token : ''),
      }
      : {},
  });

  if (previousWsClient) {
    previousWsClient.client.terminate();
  }

  const wsLink = new GraphQLWsLink(
    createClient({
      url: config_app.public.assets.url?.replace("https://", "wss://").replace("http://", "ws://") + "/graphql",
      retryAttempts: 10,
      shouldRetry: () => true,
      keepAlive: 30000,
      connectionParams: {
        authToken: token
      }
    }),
  );

  previousWsClient = wsLink;

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    //@ts-ignore
    wsLink,
    httpLink,
  );

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: typeof window === "undefined"
      ? ApolloLink.from([
        new SSRMultipartLink({
          stripDefer: true,
        }),
        splitLink,
      ])
      : splitLink,
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
      watchQuery: {
        fetchPolicy: "network-only",
      },
    },
    connectToDevTools: config_app.public.assets.dev !== 'production'
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={() => makeClient(getCookie("lf_affiliate_token"))}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
