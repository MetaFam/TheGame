import { GlobalStyle, ThemeProvider } from '@metafam/ds';
import { AppProps } from 'next/app';

const app: React.FC<AppProps> = ({ pageProps, Component }) => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default app;
