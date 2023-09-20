import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

const client = new ApolloClient({
  uri: 'https://dymer.stepzen.net/api/kindled-spaniel/__graphql',
  headers: {
    Authorization:
      'apikey dymer::stepzen.net+1000::9d616cbbde56d9a26c9a5eaf1c192c713fffe0a8dbae7501490964575805dbcd',
  },
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;