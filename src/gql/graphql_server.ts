import { getClient } from "@/lib/client";
import { OrderDocument, Query } from "./graphql";
import { ApolloClient, NetworkStatus } from "@apollo/client";

class graphql_server {
  // private client: ApolloClient<any> | null;

  // constructor() {
  //   this.client = getClient();
  // }

  async getOrderByID(id: number) {
    const client = getClient();
    if (client) {
      const query = await client.query<Query>({
        query: OrderDocument,
        variables: {
          id: Number(id),
        },
      });

      return query;
    }

    return {
      data: {
        order: null,
      },
      loading: false,
      networkStatus: NetworkStatus.ready,
    };
  }
}

const graphqlServer = new graphql_server();
export default graphqlServer;
