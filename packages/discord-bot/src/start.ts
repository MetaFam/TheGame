import express from 'express';

import { createDiscordClient } from ".";

const app = express();

const router = express.Router();

router.get('/healthz', (_, res) => {
  res.send('ok');
});

app.use(router);

createDiscordClient();
