import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config';
import { getSdk, Sdk } from './autogen/daohaus-sdk';

const defaultGqlClient = new GraphQLClient(CONFIG.daoHausGraphqlURL);
const clients = new Map([
  ['polygon', new GraphQLClient(CONFIG.daoHausPolygonGraphqlURL)],
  ['xdai', new GraphQLClient(CONFIG.daoHausXdaiGraphqlURL)],
  ['ethereum', defaultGqlClient],
]);

export function getClient(chain: string): Sdk {
  return getSdk(clients.get(chain) || defaultGqlClient);
}
