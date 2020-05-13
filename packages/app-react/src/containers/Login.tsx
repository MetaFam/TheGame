import React, {useContext, useCallback} from 'react';

import { Box } from '@material-ui/core';

import { Web3Context } from '../contexts/Web3';
import {localQueries} from "../apollo";
import { useQuery } from '@apollo/react-hooks';
import {Link} from "react-router-dom";

export const Login: React.FC = () => {
  const { data, loading } = useQuery(localQueries.get_authState);

  const { connectWeb3, disconnect } = useContext(Web3Context);

  const connect = useCallback(() => {
    connectWeb3().catch(console.error);
  }, [connectWeb3]);

  if(loading || data?.authState === 'loading') {
    return (
      <Box>
        Connecting...
      </Box>
    );
  } else if(data?.authState === 'logged') {
    const { playerId } = data;
    return (
      <Box>
        Connected
        <Link to={`/player/${playerId}`}><button>View my player</button></Link>
        <button onClick={disconnect}>Logout</button>
      </Box>
    );
  } else {
    return (
      <Box>
        <button onClick={connect}>Connect</button>
      </Box>
    )
  }
};
