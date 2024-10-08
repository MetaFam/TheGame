import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config.js';
import { getSdk } from './autogen/balancer-sdk.js';

export const balancerPolygonGraphClient = getSdk(
  new GraphQLClient(CONFIG.balancerPolygonGraphURL),
);
