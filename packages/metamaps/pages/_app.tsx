import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import App, { AppContext, AppInitialProps } from "next/app";
import { connect } from 'react-redux';

import { wrapper } from "../redux/Reducer";
import { Load3BoxUrl } from '../redux/ThreeBox';

declare const window: any;

export interface AppProps extends AppInitialProps {
  dispatch: any;
  activeSpace: string;
};

class WrappedApp extends App<AppProps> {
  public async componentDidMount() {
    const accounts = await window.ethereum.enable();
    this.props.dispatch({ type: 'UPDATE_ETH_ACCOUNTS', accounts });
    this.props.dispatch(await Load3BoxUrl(accounts[0], this.props.activeSpace));
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
  }),
)(WrappedApp);

export default wrapper.withRedux(WrappedAppRedux);
