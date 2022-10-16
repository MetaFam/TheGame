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

const {
  userbackToken,
  honeybadgerReportData,
  honeybadgerApiKey,
  honeybadgerDebug,
} = CONFIG;
const honeybadgerConfig = {
  apiKey: honeybadgerApiKey,
  environment: process.env.NODE_ENV || 'production',
  reportData: honeybadgerReportData,
  debug: honeybadgerDebug,
};

const honeybadger = Honeybadger.configure(honeybadgerConfig);

const App: React.FC<WithUrqlProps> = ({
  pageProps,
  resetUrqlClient,
  Component,
}) => (
  <HoneybadgerErrorBoundary honeybadger={honeybadger}>
    <UserbackProvider token={userbackToken}>
      <ChakraProvider theme={MetaTheme}>
        <CSSReset />
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>MetaGame</title>
          {CONFIG.gaId != null && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.gaId}`}
              />
              <script
                type="text/javascript"
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
          )}
        </Head>
        <Web3ContextProvider {...{ resetUrqlClient }}>
          <MegaMenu hide={pageProps.hideTopMenu}>
            <Component {...pageProps} />
          </MegaMenu>
        </Web3ContextProvider>
      </ChakraProvider>
    </UserbackProvider>
  </HoneybadgerErrorBoundary>
);

export default wrapUrqlClient(App);
