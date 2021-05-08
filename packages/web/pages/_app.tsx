import { ChakraProvider, CSSReset, MetaTheme } from '@metafam/ds';
import { MobileFooter } from 'components/MobileFooter';
import { PageHeader } from 'components/PageHeader';
import { Web3ContextProvider } from 'contexts/Web3Context';
import Head from 'next/head';
import { WithUrqlProps } from 'next-urql';
import React from 'react';

import { wrapUrqlClient } from '../graphql/client';

const App: React.FC<WithUrqlProps> = ({
  pageProps,
  resetUrqlClient,
  Component,
}) => (
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

export default wrapUrqlClient(App);
