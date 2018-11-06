import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from 'apollo-boost';
import { withClientState } from 'apollo-link-state';
import { initialState } from './state';
import { resolvers } from './resolvers';

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  defaults: initialState,
  resolvers
});
const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.TOKEN}`
  }
});

const link = ApolloLink.from([stateLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache
});