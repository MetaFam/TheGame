import fetch from 'node-fetch';
import config from '../config';

export async function hasuraQuery(query: string, qv: any = {}) {
  const result = await fetch(config.graphqlURL, {
    method: 'POST',
    body: JSON.stringify({ query: query, variables: qv }),
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-access-key': config.adminKey,
    },
  });

  const { errors, data } = await result.json();

  if (errors) {
    throw new Error(JSON.stringify(errors));
  }
  return data;
}
