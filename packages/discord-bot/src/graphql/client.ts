import { GraphQLClient } from 'graphql-request';

import { getSdk } from '#autogen/hasura-sdk';
import { CONFIG } from '#config';

export const client = getSdk(
  new GraphQLClient(CONFIG.graphqlURL, {
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-access-key': CONFIG.adminKey,
    },
  }),
);
