import express from 'express';

import { initDiscordBot } from './bot';
import { CONFIG } from './config';

const discordClientPromise = initDiscordBot();

const app = express();

app.get('/healthz', (_, res) => {
  res.send('ok');
});

app.listen(CONFIG.port, () => {
  discordClientPromise.then(() => {
    console.log(`Discord bot started on port ${CONFIG.port}`);
  });
});
