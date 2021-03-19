import { createClient } from 'urql';

import { CONFIG } from '../config';

console.info(`Host: ${CONFIG.graphqlURL}`)

export const client = createClient({
  url: CONFIG.graphqlURL,
  suspense: false,
});
