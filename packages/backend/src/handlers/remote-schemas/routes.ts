import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './schema';

export const remoteSchemaRoutes = express.Router();

remoteSchemaRoutes.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);
