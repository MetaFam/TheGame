import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config';
import { getSdk } from './autogen/hasura-sdk';

interface GetClientParams {
  role?: string;
  userId?: string;
  backendOnly?: boolean;
}

export const getClient = (params: GetClientParams = {}) =>
  getSdk(
    new GraphQLClient(CONFIG.graphqlURL, {
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-access-key': CONFIG.adminKey,
        'x-hasura-role': params.role || 'admin',
        'x-hasura-user-id': params.userId || '',
        'x-hasura-use-backend-only-permissions':
          params.backendOnly === true ? 'true' : 'false',
      },
    }),
  );

export const client = getClient();
