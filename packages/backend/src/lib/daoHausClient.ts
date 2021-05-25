import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config';
import { getSdk } from './autogen/daohaus-sdk';

export const clients: { [key: string]: any } = {
  ethereum: getSdk(new GraphQLClient(CONFIG.daoHausGraphqlURL)),
  polygon: getSdk(new GraphQLClient(CONFIG.daoHausPolygonGraphqlURL)),
  xdai: getSdk(new GraphQLClient(CONFIG.daoHausXdaiGraphqlURL)),
};
