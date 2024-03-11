import 'assets/custom-markdown-editor.scss';
import 'react-markdown-editor-lite/lib/index.css';

import { ChakraProvider, CSSReset, MetaTheme } from '@metafam/ds';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Animocto from 'assets/animocto.svg';
import { MegaMenu } from 'components/MegaMenu';
import { CONFIG } from 'config';
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ComposeDBContextProvider } from 'contexts/ComposeDBContext';
import { Web3ContextProvider } from 'contexts/Web3Context';
import { wrapUrqlClient } from 'graphql/client';
import { useMounted } from 'lib/hooks';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import { WithUrqlProps } from 'next-urql';
import { createConfig, http,WagmiProvider } from "wagmi";
import { mainnet, optimism, polygon } from "wagmi/chains";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, optimism, polygon],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MAINNET}`,
      ),
      [polygon.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MATIC}`,
      ),
      [optimism.id]: http("https://op-pokt.nodies.app"),

    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',

    // Required App Info
    appName: "MetaGame",

    // Optional App Info
    appDescription: "DAOs connection tissue",
    appUrl: "https://metagame.wtf", // your app's url
    appIcon: "https://metagame.wtf", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);
const queryClient = new QueryClient();

const Analytics: React.FC = () => {
  if (!CONFIG.gaId || CONFIG.nodeEnv !== 'production') return <></>
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${CONFIG.gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

const App: React.FC<WithUrqlProps> = ({
  pageProps,
  resetUrqlClient,
  Component,
}) => {
  const isMounted = useMounted();
  if (!isMounted) {
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: '#130032',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image src={Animocto.src} alt="Loading…" height={250} width={250} />
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            font-size: 18px;
            font-weight: 400;
            line-height: 1.8;
            color: #333;
            font-family: sans-serif;
          }
          h1 {
            font-weight: 700;
          }
          p {
            margin-bottom: 10px;
          }
        `}</style>
      </div>
    );
  }
  return (
    <ChakraProvider theme={MetaTheme} resetCSS={true}>

      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
          <CSSReset />
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>MetaGame</title>
          </Head>
          <Web3ContextProvider {...{ resetUrqlClient }}>
            <ComposeDBContextProvider>
              <MegaMenu hide={pageProps.hideTopMenu}>
                <Analytics />
                <Component {...pageProps} />
              </MegaMenu>
            </ComposeDBContextProvider>
            
          </Web3ContextProvider>
          </ConnectKitProvider>
        </QueryClientProvider>
        
 
      </WagmiProvider>
    </ChakraProvider>
  );
};

export default wrapUrqlClient(App);
