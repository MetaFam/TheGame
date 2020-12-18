import { ChakraProvider, CSSReset, MetaTheme } from '@metafam/ds';
import { MobileFooter } from 'components/MobileFooter';
import { PageHeader } from 'components/PageHeader';
import { CONFIG } from 'config';
import { Web3ContextProvider } from 'contexts/Web3Context';
import { getTokenFromStore } from 'lib/auth';
import { withUrqlClient } from 'next-urql';
import { AppProps } from 'next/app';
import Head from 'next/head';

const app: React.FC<AppProps> = ({ pageProps, Component }) => {
  return (
    <ChakraProvider theme={MetaTheme}>
      <CSSReset />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MetaGame</title>
      </Head>
      <Web3ContextProvider>
        {!pageProps.hidePageHeader && <PageHeader />}
        {!pageProps.hidePageHeader && <MobileFooter />}
        <Component {...pageProps} />
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
