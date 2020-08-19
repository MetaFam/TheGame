import { makeExecutableSchema } from 'graphql-tools';

import { getDaoHausMemberships } from './resolvers/daohaus/resolver';
import { getBoxProfile } from './resolvers/getBoxProfile/resolver';
import { typeDefs } from './typeDefs';

const resolvers = {
  Query: {
    getBoxProfile,
    getDaoHausMemberships,
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
