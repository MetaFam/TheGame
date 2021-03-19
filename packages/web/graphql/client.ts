import { createClient } from 'urql';

import { CONFIG } from '../config';

console.info(`Client URI: ${CONFIG.graphqlURL}`)

export const client = createClient({
  url: CONFIG.graphqlURL,
  suspense: false,
});
