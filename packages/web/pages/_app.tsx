import 'react-markdown-editor-lite/lib/index.css';
import 'assets/custom-markdown-editor.scss';

import { Honeybadger, HoneybadgerErrorBoundary } from '@honeybadger-io/react';
import { ChakraProvider, CSSReset, MetaTheme } from '@metafam/ds';
import { Constants } from '@metafam/utils';
import { UserbackProvider } from '@userback/react';
import { MegaMenu } from 'components/MegaMenu/index';
import { CONFIG } from 'config';
import { Web3ContextProvider } from 'contexts/Web3Context';
import { wrapUrqlClient } from 'graphql/client';
import Head from 'next/head';
import { WithUrqlProps } from 'next-urql';
import React from 'react';

import LoggingErrorBoundary from '../lib/LoggingErrorBoundary';

const { userbackToken, honeybadgerApiKey } = CONFIG;
const { APP_ENV } = Constants;
const honeybadgerConfig = {
  apiKey: honeybadgerApiKey,
  APP_ENV,
  enableUncaught: true,
  reportData: APP_ENV !== 'development',
  // TODO include git SHA in github action deployment
  // revision: 'git SHA/project version'
};

const honeybadger = Honeybadger.configure(honeybadgerConfig);

const Analytics: React.FC = () => (
  <>
    <script
      async
      defer
      src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.gaId}`}
    />
    <script
      type="text/javascript"
      async
      defer
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments) }
          gtag('js', new Date());
          gtag('config', '${CONFIG.gaId}');
        `,
      }}
    />
  </>
);

const App: React.FC<WithUrqlProps> = ({
  pageProps,
  resetUrqlClient,
  Component,
}) => (
  <LoggingErrorBoundary>
    <ChakraProvider theme={MetaTheme}>
      <CSSReset />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MetaGame</title>
        {APP_ENV === 'production' && <Analytics />}
      </Head>
      <Web3ContextProvider {...{ resetUrqlClient }}>
        <MegaMenu hide={pageProps.hideTopMenu}>
          <Component {...pageProps} />
        </MegaMenu>
      </Web3ContextProvider>
    </ChakraProvider>
  </LoggingErrorBoundary>
);

const DeployedApp: React.FC<WithUrqlProps> = ({
  pageProps,
  resetUrqlClient,
  Component,
}) => (
  <HoneybadgerErrorBoundary {...{ honeybadger }}>
    <>
      <UserbackProvider token={userbackToken} />
      <App {...{ pageProps, resetUrqlClient, Component }} />
    </>
  </HoneybadgerErrorBoundary>
);

export default APP_ENV === 'development'
  ? wrapUrqlClient(App)
  : wrapUrqlClient(DeployedApp);
