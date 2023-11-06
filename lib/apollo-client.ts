import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://wpe-hiring.tokopedia.net/graphql", // Replace with your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});
