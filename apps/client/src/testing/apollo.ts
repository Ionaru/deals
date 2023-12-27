import { ApolloQueryResult, NetworkStatus } from "@apollo/client";

export const buildApolloQueryResult = <T>(data: T): ApolloQueryResult<T> => ({
  data,
  loading: false,
  networkStatus: NetworkStatus.ready,
});
