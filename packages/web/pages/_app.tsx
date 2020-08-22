import { ChakraProvider, CSSReset, MetaTheme } from '@metafam/ds';
import { PageHeader } from 'components/PageHeader';
import { AppProps } from 'next/app';
import Head from 'next/head';

const app: React.FC<AppProps> = ({ pageProps, Component }) => {
  return (
    <ChakraProvider theme={MetaTheme}>
      <CSSReset />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {!pageProps.hidePageHeader && <PageHeader />}
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default app;
