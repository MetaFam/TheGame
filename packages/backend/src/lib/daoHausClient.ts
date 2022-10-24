import { CONFIG } from 'config';
import { GraphQLClient } from 'graphql-request';

import { getSdk, Sdk } from './autogen/daohaus-sdk.js';

const clients = new Map([
  ['polygon', new GraphQLClient(CONFIG.daoHausPolygonGraphqlURL)],
  ['xdai', new GraphQLClient(CONFIG.daoHausXdaiGraphqlURL)],
  ['ethereum', new GraphQLClient(CONFIG.daoHausGraphqlURL)],
]);

export function getClient(chain: string): Sdk {
  const gqlClient = clients.get(chain);
  if (!gqlClient)
    throw new Error(
      `The '${chain}' chain is unrecognized, unable to create GQL Client`,
    );

  return getSdk(gqlClient);
}
