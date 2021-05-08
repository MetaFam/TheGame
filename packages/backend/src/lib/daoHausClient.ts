import { GraphQLClient } from 'graphql-request';

import { CONFIG } from '../config';
import { getSdk } from './autogen/daohaus-sdk';

export const daoHausClient = getSdk(
  new GraphQLClient(CONFIG.daoHausGraphqlURL),
);
