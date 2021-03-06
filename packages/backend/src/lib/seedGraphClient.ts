import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config';
import { getSdk } from './autogen/seedgraph-sdk';

export const seedGraphClient = getSdk(
  new GraphQLClient(CONFIG.seedGraphqlURL)
);
