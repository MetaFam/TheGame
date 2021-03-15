import { ChakraProvider, CSSReset, MetaTheme } from '@metafam/ds';
import { MobileFooter } from 'components/MobileFooter';
import { PageHeader } from 'components/PageHeader';
import { CONFIG } from 'config';
import { Web3ContextProvider } from 'contexts/Web3Context';
import { getTokenFromStore } from 'lib/auth';
import { withUrqlClient, WithUrqlProps } from 'next-urql';
import Head from 'next/head';
import React from 'react';

const app: React.FC<WithUrqlProps> = ({ pageProps, resetUrqlClient, Component }) => {
  return (
    <ChakraProvider theme={MetaTheme}>
      <CSSReset />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MetaGame</title>
      </Head>
      <Web3ContextProvider resetUrqlClient={resetUrqlClient}>
        <>
          {!pageProps.hideAppDrawer && <PageHeader />}
          {!pageProps.hideAppDrawer && <MobileFooter />}
          <Component {...pageProps} />
        </>
      </Web3ContextProvider>
    </ChakraProvider>
  );
};

export default withUrqlClient(
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
  },
)(app);
