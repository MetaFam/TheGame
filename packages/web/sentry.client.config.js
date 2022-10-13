import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    'https://e41a257b3200467f83778de7e66a39d7@o4503971279601664.ingest.sentry.io/4503971282157568',
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  maxBreadcrumbs: 50,
  debug: true,
});
