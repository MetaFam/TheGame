import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import { createApolloClient } from './apollo';

import Web3ContextProvider from './contexts/Web3';

import Header from './components/Header';
import Routes from './Routes';

const apolloClient = createApolloClient();

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Web3ContextProvider>
        <CssBaseline />
        <Router>
          <Header />
          <Routes />
        </Router>
      </Web3ContextProvider>
    </ApolloProvider>
  );
}

export default App;
