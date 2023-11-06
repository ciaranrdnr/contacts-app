import { ApolloProvider } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { apolloClient } from "../lib/apollo-client";
import { CacheProvider } from "@emotion/react";
import { AppProps } from "next/app";
import createCache from "@emotion/cache";

const myCache = createCache({
  key: "emotion-cache",
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  if (process.env.NODE_ENV !== "production") {
    loadDevMessages();
    loadErrorMessages();
  }
  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={myCache}>
        <Component {...pageProps} />
      </CacheProvider>
    </ApolloProvider>
  );
};

export default MyApp;
