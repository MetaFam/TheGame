import React from 'react';
import { connect } from 'react-redux';
import App, { AppContext, AppInitialProps } from "next/app";
import { CSSReset, ThemeProvider } from '@chakra-ui/core';

import { wrapper } from "../redux/Reducer";

declare const window: any;

export interface AppProps extends AppInitialProps {
  dispatch: any;
  activeSpace: string;
};

class WrappedApp extends App<AppProps> {
  public async componentDidMount() {

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
      <ThemeProvider>
        <CSSReset/>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

const WrappedAppRedux = connect(
  (state: any) => ({
    menu: state.menu,
    activeSpace: state.activeSpace,
  })
)(WrappedApp);

export default wrapper.withRedux(WrappedAppRedux);
