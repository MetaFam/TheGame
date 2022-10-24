import { CONFIG } from 'config';
import { GraphQLClient } from 'graphql-request';

import { getSdk } from './autogen/seedgraph-sdk.js';

export const seedGraphClient = getSdk(new GraphQLClient(CONFIG.seedGraphqlURL));
