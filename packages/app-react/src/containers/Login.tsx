import React, {useContext} from 'react';

import { Box } from '@material-ui/core';

import { Web3Context } from '../contexts/Web3';
import {localQueries} from "../apollo";
import { useQuery } from '@apollo/react-hooks';

export default function Login() {
  const { data, loading } = useQuery(localQueries.get_authState);

  const { connectWeb3 } = useContext(Web3Context);

  if(loading || data?.authState === 'loading') {
    return (
      <Box>
        Connecting...
      </Box>
    );
  } else if(data?.authState === 'logged') {
    return (
      <Box>Connected</Box>
    );
  } else if(data?.authState === 'error') {
    return (
      <Box>
        Connection error
      </Box>
    );
  } else if(data?.authState === 'anonymous') {
    return (
      <Box>
        <button onClick={connectWeb3}>Connect</button>
      </Box>
    );
  }

  return 'Unknown state'
}
