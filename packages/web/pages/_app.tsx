import 'react-markdown-editor-lite/lib/index.css';
import 'assets/custom-markdown-editor.scss';

import { Honeybadger, HoneybadgerErrorBoundary } from '@honeybadger-io/react';
import { ChakraProvider, CSSReset, MetaTheme } from '@metafam/ds';
import { UserbackProvider } from '@userback/react';
import { MegaMenu } from 'components/MegaMenu/index';
import { CONFIG } from 'config';
import { Web3ContextProvider } from 'contexts/Web3Context';
import { wrapUrqlClient } from 'graphql/client';
import Head from 'next/head';
import { WithUrqlProps } from 'next-urql';
import React from 'react';

const { userbackToken, honeybadgerAPIKey } = CONFIG;

const Analytics: React.FC = () =>
  !CONFIG.gaId ? null : (
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
  <ChakraProvider theme={MetaTheme}>
    <CSSReset />
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>MetaGame</title>
      {CONFIG.appEnv === 'production' && <Analytics />}
    </Head>
    <Web3ContextProvider {...{ resetUrqlClient }}>
      <MegaMenu hide={pageProps.hideTopMenu}>
        <Component {...pageProps} />
      </MegaMenu>
    </Web3ContextProvider>
  </ChakraProvider>
);

const DeployedApp: React.FC<WithUrqlProps> = (props) => {
  const honeybadgerConfig = {
    apiKey: honeybadgerAPIKey,
    environment: CONFIG.appEnv,
    enableUncaught: true,
    reportData: CONFIG.useHoneybadger,
    // TODO include git SHA in github action deployment
    // revision: 'git SHA/project version'
  };
  const honeybadger = Honeybadger.configure(honeybadgerConfig);

  return (
    <HoneybadgerErrorBoundary {...{ honeybadger }}>
      <>
        {userbackToken && <UserbackProvider token={userbackToken} />}
        <App {...props} />
      </>
    </HoneybadgerErrorBoundary>
  );
};

export default wrapUrqlClient(CONFIG.useHoneybadger ? DeployedApp : App);
