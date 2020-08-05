import { GraphQLClient } from 'graphql-request';
import { Variables } from 'graphql-request/dist/types';

import { CONFIG } from '../config';

export async function hasuraQuery<T = any>(
  query: string,
  variables?: Variables,
): Promise<T> {
  const graphQLClient = new GraphQLClient(CONFIG.graphqlURL, {
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-access-key': CONFIG.adminKey,
    },
  });

  try {
    return await graphQLClient.request<T>(query, variables);
  } catch (error) {
    throw new Error(JSON.stringify(error, undefined, 2));
  }
}
