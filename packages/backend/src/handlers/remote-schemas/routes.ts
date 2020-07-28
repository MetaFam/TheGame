import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { graphqlSchema } from './schema';

export const remoteSchemaRoutes = express.Router();

remoteSchemaRoutes.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true,
  }),
);
