// import bodyParser from 'body-parser';
import bodyParser from 'body-parser';
import Bottleneck from 'bottleneck';
import cors from 'cors';
import express from 'express';

import { CONFIG } from './config';
import { router } from './handlers/routes';
// import { errorMiddleware } from './lib/apiHelpers';

const app = express();

app.locals.limiter = new Bottleneck({
  maxConcurrent: 5,
});
// tracks the current contents of Bottleneck
app.locals.queuedRecacheFor = {};

app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: true }));

app.disable('x-powered-by');

app.use(router);

// app.use(errorMiddleware);

app.listen(CONFIG.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${CONFIG.port}`);
});
