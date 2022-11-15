import express, { Application } from 'express';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './schema.js';

export const remoteSchemaRoutes = express.Router();

remoteSchemaRoutes.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }) as Application,
);
