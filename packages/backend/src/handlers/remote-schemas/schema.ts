import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs } from './typeDefs';
import { getBoxProfile } from './resolvers/getBoxProfile/resolver';

const resolvers = {
  Query: {
    getBoxProfile,
  },
};

export const graphqlSchema = makeExecutableSchema({ typeDefs, resolvers });
