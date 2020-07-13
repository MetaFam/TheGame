import bodyParser from 'body-parser';
import express from 'express';

import { CONFIG } from './config';
import { router } from './handlers/routes';
import { errorMiddleware } from './lib/apiHelpers';

const app = express();

app.use(bodyParser.json());

app.use(router);

app.use(errorMiddleware);

app.listen(CONFIG.port, () => {
  console.log(`Listening on port ${CONFIG.port}`);
});
