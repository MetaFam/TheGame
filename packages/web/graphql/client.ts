import { retryExchange } from '@urql/exchange-retry';
import {
  initUrqlClient,
  NextComponentType,
  withUrqlClient,
  WithUrqlProps,
} from 'next-urql';
import React, { createElement } from 'react';
import {
  cacheExchange,
  Client,
  CombinedError,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from 'urql';

import { CONFIG } from '../config';
import { getTokenFromStore } from '../lib/auth';

const errorHasResponseTimeout = (err: CombinedError): boolean =>
  err.graphQLErrors.length > 0 &&
  !!err.graphQLErrors.find((_err) => _err.message === 'ResponseTimeout');

const retryExchangeFunc = retryExchange({
  retryIf: (error) => !!(errorHasResponseTimeout(error) || error.networkError),
});

export const client = createClient({
  url: CONFIG.graphqlURL,
  suspense: false,
  exchanges: [dedupExchange, cacheExchange, retryExchangeFunc, fetchExchange],
});

export const getSsrClient = (): [Client, ReturnType<typeof ssrExchange>] => {
  const ssrCache = ssrExchange({ isClient: false });

  const ssrClient = initUrqlClient(
    {
      url: CONFIG.graphqlURL,
      exchanges: [
        dedupExchange,
        cacheExchange,
        ssrCache,
        retryExchangeFunc,
        fetchExchange,
      ],
    },
    false,
  );
  if (!ssrClient) throw new Error('wtf');

  return [ssrClient, ssrCache];
};

// We do this to enable ssr cache on pages that are not directly wrapped in 'withUrqlClient' (but on _app)
// https://github.com/FormidableLabs/urql/issues/1481
const customWithUrqlClient = (
  WithUrql: NextComponentType,
): React.FC<WithUrqlProps> => ({ pageProps, urqlState, ...props }) =>
  createElement(WithUrql, {
    urqlState: pageProps.urqlState || urqlState,
    pageProps,
    ...props,
  });

export const wrapUrqlClient = (AppOrPage: React.FC<WithUrqlProps>) =>
  customWithUrqlClient(
    withUrqlClient(
      (_ssrExchange, ctx) => ({
        url: CONFIG.graphqlURL,
        fetchOptions: () => {
          const token = ctx
            ? ctx?.req?.headers?.authorization
            : getTokenFromStore();
          return {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          };
        },
      }),
      {
        neverSuspend: true,
        ssr: false,
      },
    )(AppOrPage),
  );
