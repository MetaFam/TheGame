import React from 'react';
import { initUrqlClient, withUrqlClient } from 'next-urql';

import { Client, cacheExchange, createClient, dedupExchange, fetchExchange, ssrExchange } from 'urql';

import { CONFIG } from '../config';
import { getTokenFromStore } from '../lib/auth';

export const client = createClient({
  url: CONFIG.graphqlURL,
  suspense: false,
});

export const getSsrClient = (): [Client, ReturnType<typeof ssrExchange>] => {
  const ssrCache = ssrExchange({ isClient: false });

  const ssrClient = initUrqlClient({
    url: CONFIG.graphqlURL,
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  }, false);

  if(!ssrClient) throw new Error('wtf');
  return [ssrClient, ssrCache];
}

export const wrapUrqlClient = (appOrPage: React.FC<any>) => withUrqlClient(
  (_ssrExchange, ctx) => ({
    url: CONFIG.graphqlURL,
    fetchOptions: () => ({
      headers: {
        Authorization: ctx
          ? `Bearer ${ctx?.req?.headers?.authorization ?? ''}`
          : `Bearer ${getTokenFromStore() ?? ''}`,
      },
    }),
  }),
  {
    neverSuspend: true,
    ssr: false,
  },
)(appOrPage);
