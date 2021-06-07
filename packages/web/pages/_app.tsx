/* eslint-disable react/no-danger */
import { ChakraProvider, CSSReset, MetaTheme } from '@metafam/ds';
import { MobileFooter } from 'components/MobileFooter';
import { PageHeader } from 'components/PageHeader';
import { CONFIG } from 'config';
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
      {CONFIG.gaId != null && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.gaId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', '${CONFIG.gaId}');
            `,
            }}
          />
        </>
      )}
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
