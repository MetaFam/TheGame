import { ChakraProvider, theme } from '@chakra-ui/react';
import App, { AppContext, AppInitialProps } from 'next/app';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createClient, Provider } from 'urql';

import { CONFIG } from '../config';
import { wrapper } from '../redux/Reducer';

declare const window: any;

export const client = createClient({
  url: CONFIG.graphqlURL,
  suspense: false,
});

export interface AppProps extends AppInitialProps {
  dispatch: Dispatch;
}

class WrappedApp extends App<AppProps> {
  public async componentDidMount() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.enable();
        this.props.dispatch({ type: 'METAMASK', value: true });
        this.props.dispatch({ type: 'ACCOUNTS', value: accounts });
      } catch (error) {
        console.error(error);
        this.props.dispatch({ type: 'METAMASK', value: false });
      }
    }
  }

  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        appProp: ctx.pathname,
      },
    };
  };

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider value={client}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    );
  }
}

const WrappedAppRedux = connect()(WrappedApp);

export default wrapper.withRedux(WrappedAppRedux);
