import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import App, { AppContext, AppInitialProps } from "next/app";
import { ChakraProvider, theme } from '@chakra-ui/react';

import { wrapper } from "../redux/Reducer";

declare const window: any;

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
      }
      
    }
  }

  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        appProp: ctx.pathname
      }
    };
  };

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <ChakraProvider resetCSS={true} theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    )
  }
}

const WrappedAppRedux = connect()(WrappedApp);

export default wrapper.withRedux(WrappedAppRedux);