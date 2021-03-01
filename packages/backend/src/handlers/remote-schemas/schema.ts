import { makeExecutableSchema } from 'graphql-tools';

import { getBrightIdStatus } from './resolvers/brightId/resolver';
import { getDaoHausMemberships } from './resolvers/daohaus/resolver';
import { getBoxProfile } from './resolvers/getBoxProfile/resolver';
import { typeDefs } from './typeDefs';
import { uuid } from './types/uuid';

const resolvers = {
  Query: {
    getBoxProfile,
    getDaoHausMemberships,
    getBrightIdStatus,
  },
  uuid,
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
