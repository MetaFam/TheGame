import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { CssBaseline } from '@material-ui/core';
import { createApolloClient } from './apollo';

import Home from './containers/Home';
import Web3ContextProvider from './contexts/Web3';

const apolloClient = createApolloClient();

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Web3ContextProvider>
        <CssBaseline/>
        <Home/>
      </Web3ContextProvider>
    </ApolloProvider>
  );
}

export default App;
