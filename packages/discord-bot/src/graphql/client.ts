import { GraphQLClient } from 'graphql-request';

import { getSdk } from '../autogen/hasura-sdk.js';
import { CONFIG } from '../config.js';

export const client = getSdk(
  new GraphQLClient(CONFIG.graphqlURL, {
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-access-key': CONFIG.adminKey,
    },
  }),
);
