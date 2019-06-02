import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Loading } from 'quasar';
import { onError } from 'apollo-link-error';

const BASE_URL = process.env.BASE_URL;

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: BASE_URL + '/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  debugger;
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const interceptor = new ApolloLink((operation, forward) => {
  console.log(`starting request`, operation);
  Loading.show();
  setTimeout(function() {
    Loading.hide();
  }, 2000);
  return forward(operation).map(data => {
    console.log(`ending request for ${operation.operationName}`, data);
    Loading.hide();
    return data;
  });
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: interceptor.concat(httpLink, errorLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;
