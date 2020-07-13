import express from 'express';
import bodyParser from 'body-parser';

import config from './config';

import routes from './handlers/routes';
import { errorMiddleware } from './lib/apiHelpers';

const app = express();

app.use(bodyParser.json());

app.use(routes);

app.use(errorMiddleware);

app.listen(config.port, function () {
  console.log(`Listening on port ${config.port}`);
});
