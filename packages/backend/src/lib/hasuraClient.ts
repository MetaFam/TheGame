import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config.js';
import { getSdk, Sdk } from './autogen/hasura-sdk.js';

interface GetClientParams {
  role?: string;
  userId?: string;
  backendOnly?: boolean;
}

export const getClient = (params: GetClientParams = {}): Sdk =>
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
