import { makeExecutableSchema } from 'graphql-tools';

import { getBoxProfile } from './resolvers/getBoxProfile/resolver';
import { typeDefs } from './typeDefs';

const resolvers = {
  Query: {
    getBoxProfile,
  },
};

export const graphqlSchema = makeExecutableSchema({ typeDefs, resolvers });
