import 'react-markdown-editor-lite/lib/index.css';
import 'assets/custom-markdown-editor.scss';

import { Honeybadger, HoneybadgerErrorBoundary } from '@honeybadger-io/react';
import { ChakraProvider, CSSReset, MetaTheme } from '@metafam/ds';
import { UserbackProvider } from '@userback/react';
import { MegaMenu } from 'components/MegaMenu/index';
import { CONFIG } from 'config';
import { ComposeDBContextProvider } from 'contexts/ComposeDBContext';
import { Web3ContextProvider } from 'contexts/Web3Context';
import { wrapUrqlClient } from 'graphql/client';
import Head from 'next/head';
import { WithUrqlProps } from 'next-urql';
import React from 'react';

const { environment, userbackToken, honeybadgerApiKey } = CONFIG;
const honeybadgerConfig = {
  apiKey: honeybadgerApiKey,
  environment,
  enableUncaught: true,
  reportData: environment !== 'development',
  // TODO include git SHA in github action deployment
  // revision: 'git SHA/project version'
};

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
  <React.StrictMode>
    <ChakraProvider theme={MetaTheme}>
      <CSSReset />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MetaGame</title>
        {environment === 'production' && <Analytics />}
      </Head>
      <Web3ContextProvider {...{ resetUrqlClient }}>
        <ComposeDBContextProvider>
          <MegaMenu hide={pageProps.hideTopMenu}>
            <Component {...pageProps} />
          </MegaMenu>
        </ComposeDBContextProvider>
      </Web3ContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

const DeployedApp: React.FC<WithUrqlProps> = ({
  pageProps,
  resetUrqlClient,
  Component,
}) => {
  const appContent = (
    <>
      <UserbackProvider token={userbackToken}></UserbackProvider>
      <App {...{ pageProps, resetUrqlClient, Component }} />
    </>
  );

  // Added this because I kept seeing
  // `TypeError: _window.addEventListener is not a function`
  // when building next.js pages locally
  if (typeof window !== 'undefined') {
    const honeybadger = Honeybadger.configure(honeybadgerConfig);

    return (
      <HoneybadgerErrorBoundary {...{ honeybadger }}>
        {appContent}
      </HoneybadgerErrorBoundary>
    );
  }
  return appContent;
};

export default environment === 'development'
  ? wrapUrqlClient(App)
  : wrapUrqlClient(DeployedApp);
