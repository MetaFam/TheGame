import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config';
import { getSdk } from './autogen/hasura-sdk';

export const client = getSdk(
  new GraphQLClient(CONFIG.graphqlURL, {
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-access-key': CONFIG.adminKey,
    },
  }),
);
