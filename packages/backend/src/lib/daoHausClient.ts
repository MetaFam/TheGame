import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config';
import { getSdk, Sdk } from './autogen/daohaus-sdk';

export function clientFactory(chain: string): Sdk {
  switch (chain) {
    case 'polygon':
      return getSdk(new GraphQLClient(CONFIG.daoHausPolygonGraphqlURL));
    case 'xdai':
      return getSdk(new GraphQLClient(CONFIG.daoHausXdaiGraphqlURL));
    default:
      return getSdk(new GraphQLClient(CONFIG.daoHausGraphqlURL));
  }
}
