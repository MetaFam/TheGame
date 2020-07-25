import fetch from 'node-fetch';

import { CONFIG } from '../config';

export async function hasuraQuery(query: string, qv: any = {}) {
  const result = await fetch(CONFIG.graphqlURL, {
    method: 'POST',
    body: JSON.stringify({ query, variables: qv }),
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-access-key': CONFIG.adminKey,
    },
  });

  const { errors, data } = await result.json();

  if (errors) {
    throw new Error(JSON.stringify(errors));
  }
  return data;
}
