import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { CssBaseline, Box } from '@material-ui/core';
import { createApolloClient } from './apollo';

import PlayerList from './containers/PlayerList';

const apolloClient = createApolloClient();

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <CssBaseline/>
      <Box>
        <PlayerList/>
      </Box>
    </ApolloProvider>
  );
}

export default App;
