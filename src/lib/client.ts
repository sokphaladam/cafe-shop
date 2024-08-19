import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { config_app } from "./config_app";
import { cookies } from "next/headers";

export const { getClient } = registerApolloClient(
  (initialtoken?: string | null) => {
    const endpoint = config_app.public.assets.url;
    const token = initialtoken
      ? initialtoken
      : cookies().get("tk_token")?.value;

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: endpoint + "?token=" + token,
        headers: token
          ? {
              Authorization: "Bearer " + token,
            }
          : {},
      }),
    });
  }
);
