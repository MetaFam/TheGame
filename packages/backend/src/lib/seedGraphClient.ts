import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config.js';
import { getSdk } from './autogen/seedgraph-sdk.js';

export const seedGraphClient = getSdk(new GraphQLClient(CONFIG.seedGraphURL));
