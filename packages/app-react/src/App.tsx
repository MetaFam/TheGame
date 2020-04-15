import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { CssBaseline, Box } from '@material-ui/core';
import { createApolloClient } from './apollo';

import PlayerList from './containers/PlayerList';
import Login from './containers/Login';
import Web3ContextProvider from './contexts/Web3';

const apolloClient = createApolloClient();

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Web3ContextProvider>
        <CssBaseline/>
        <Box>
          <PlayerList/>
          <Login/>
        </Box>
      </Web3ContextProvider>
    </ApolloProvider>
  );
}

export default App;
