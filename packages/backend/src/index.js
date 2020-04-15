import express from 'express';
import bodyParser  from 'body-parser';

import config  from './config';

import routes from './handlers/routes';

const app = express();

app.use(bodyParser.json());

app.use(routes);

app.listen(config.port, function () {
  console.log(`Listening on port ${config.port}`)
});
