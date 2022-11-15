import Bottleneck from 'bottleneck';
import cors from 'cors';
import express, { Express, RequestHandler } from 'express';

import { CONFIG } from './config.js';
import { router } from './handlers/routes.js';
import { errorMiddleware } from './lib/apiHelpers.js';

const app: Express = express();

app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(express.json() as RequestHandler);

app.use(cors({ credentials: true, origin: true }));

app.disable('x-powered-by');

app.locals.limiter = new Bottleneck({
  maxConcurrent: 30,
  minTime: 100, // time to wait between launching jobs (100 = 10 / second)
});

// This isn't getting called on failure. Further debugging is needed.
app.locals.limiter.on(
  'failed',
  (error: string, jobInfo: Record<string, unknown>) => {
    // Honeybadger.notify(error);

    console.warn({
      msg: `JOB FAILED ERROR: "${error}"`,
      etime: error.includes('connect ETIMEDOUT'),
      eagain: error.includes('getaddrinfo EAI_AGAIN'),
      refused: error.includes('connect ECONNREFUSED'),
      lt20: (jobInfo.retryCount as number) <= 20,
    });
    // The daemon has fallen over, wait for it to come back
    if (
      (error.includes('connect ETIMEDOUT') ||
        error.includes('getaddrinfo EAI_AGAIN') ||
        error.includes('connect ECONNREFUSED')) &&
      (jobInfo.retryCount as number) <= 20 // sanity check to avoid clogging queue
    ) {
      console.warn(
        `Job Failed: "${error}". Retry #${
          (jobInfo.retryCount as number) + 1
        } in 2s.`,
      );
      return 2000; // retry in 2s
    }
    return null;
  },
);

app.use(router);

app.use(errorMiddleware);

app.listen(CONFIG.port, () => {
  // eslint-disable-next-line no-console
  console.info(`Listening on port ${CONFIG.port}`);
});
