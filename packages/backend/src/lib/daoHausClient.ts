import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config';
import { getSdk } from './autogen/daohaus-sdk';

export const mainnet = getSdk(new GraphQLClient(CONFIG.daoHausGraphqlURL));

export const polygon = getSdk(
  new GraphQLClient(CONFIG.daoHausPolygonGraphqlURL),
);

export const xdai = getSdk(new GraphQLClient(CONFIG.daoHausXdaiGraphqlURL));
