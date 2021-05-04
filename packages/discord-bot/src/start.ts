import express from 'express';

import { createDiscordClient } from ".";
import { CONFIG } from './config';

createDiscordClient();

const app = express();

app.get('/healthz', (_, res) => {
  res.send('ok');
});

app.listen(CONFIG.port, () => {
  console.log(`Discord bot started on port ${CONFIG.port}`);
});
