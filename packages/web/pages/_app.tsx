import { GlobalStyle, ThemeProvider, MetaTheme } from '@metafam/ds';
import { AppProps } from 'next/app';

const app: React.FC<AppProps> = ({ pageProps, Component }) => {
  return (
    <ThemeProvider theme={MetaTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default app;
