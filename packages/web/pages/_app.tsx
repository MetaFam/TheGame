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
      <script async src="https://www.googletagmanager.com/gtag/js?id=%NEXT_PUBLIC_GA4_ID%"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date());

        gtag('config', '%NEXT_PUBLIC_GA4_ID%');
      </script>
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
