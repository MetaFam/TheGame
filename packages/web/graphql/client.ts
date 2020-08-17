import { createClient } from 'urql';

import { CONFIG } from '../config';

export const client = createClient({
  url: CONFIG.graphqlURL,
});
