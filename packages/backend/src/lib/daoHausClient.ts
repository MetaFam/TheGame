import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config.js';
import { getSdk, Sdk } from './autogen/daohaus-sdk.js';

const clients = new Map([
  ['polygon', new GraphQLClient(CONFIG.daoHausPolygonGraphURL)],
  ['xdai', new GraphQLClient(CONFIG.daoHausXDAIGraphURL)],
  ['ethereum', new GraphQLClient(CONFIG.daoHausGraphURL)],
]);

export function getClient(chain: string): Sdk {
  const gqlClient = clients.get(chain);
  if (!gqlClient) {
    throw new Error(
      `The '${chain}' chain is unrecognized, unable to create GQL Client`,
    );
  }

  return getSdk(gqlClient);
}
