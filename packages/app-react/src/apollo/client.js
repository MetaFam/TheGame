import ApolloClient from 'apollo-boost';

import { CONFIG } from '../config';
import { logout } from './auth';
import * as localQueries from './localQueries';

export function createApolloClient() {
  let client;

  const defaultClientState = {
    authState: 'anonymous',
    authToken: null,
    playerId: null,
  };

  async function authMiddleware(operation) {
    const queryLogin = client.readQuery({ query: localQueries.GetAuthState });

    if (queryLogin.authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${queryLogin.authToken}`,
        },
      });
    }
  }

  function onErrorMiddleware({
    networkError = {},
    graphQLErrors = {},
    operation,
  }) {
    if (
      networkError.statusCode === 401 ||
      graphQLErrors[0]?.extensions?.code === 'invalid-jwt'
    ) {
      console.error('Authentication error, login out');
      logout(client);
    } else {
      console.error('GraphQL request error:', networkError);
    }
  }

  client = new ApolloClient({
    uri: CONFIG.graphqlURL,
    request: authMiddleware,
    onError: onErrorMiddleware,
    clientState: {
      defaults: defaultClientState,
      resolvers: {},
    },
  });

  client.onResetStore(() => {
    client.writeData({ data: defaultClientState });
  });

  return client;
}
