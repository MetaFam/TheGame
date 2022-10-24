import { GraphQLClient } from 'graphql-request';

import { getSdk } from './autogen/balancerpolygon-sdk.js';

const balancerPolygonGraphqlURL =
  'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2';

export const balancerPolygonGraphClient = getSdk(
  new GraphQLClient(balancerPolygonGraphqlURL),
);
