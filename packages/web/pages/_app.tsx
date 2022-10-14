import 'react-markdown-editor-lite/lib/index.css';
import 'assets/custom-markdown-editor.scss';

import { Honeybadger, HoneybadgerErrorBoundary } from '@honeybadger-io/react';
import { ChakraProvider, CSSReset, MetaTheme } from '@metafam/ds';
import { MegaMenu } from 'components/MegaMenu/index';
import { CONFIG } from 'config';
import { Web3ContextProvider } from 'contexts/Web3Context';
import { wrapUrqlClient } from 'graphql/client';
import Head from 'next/head';
import { WithUrqlProps } from 'next-urql';
import React, { useEffect } from 'react';
import { hotjar } from 'react-hotjar';

const config = {
  apiKey: CONFIG.honeybadgerApiKey,
  environment: process.env.NODE_ENV || 'production',
  reportData: CONFIG.honeybadgerReportData as unknown as boolean,
};

const honeybadger = Honeybadger.configure(config);

const App: React.FC<WithUrqlProps> = ({
  pageProps,
  resetUrqlClient,
  Component,
}) => {
  useEffect(() => {
    if (CONFIG.hotjarId != null) {
      const hotjarId = +CONFIG.hotjarId;
      hotjar.initialize(hotjarId, 1);
    }
  }, []);

  return (
    <HoneybadgerErrorBoundary honeybadger={honeybadger}>
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
          {!!CONFIG.clarityId && (
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", '${CONFIG.clarityId}');
            `,
              }}
            />
          )}
        </Head>
        <Web3ContextProvider {...{ resetUrqlClient }}>
          <MegaMenu hide={pageProps.hideTopMenu}>
            <Component {...pageProps} />
          </MegaMenu>
        </Web3ContextProvider>
      </ChakraProvider>
    </HoneybadgerErrorBoundary>
  );
};

export default wrapUrqlClient(App);
