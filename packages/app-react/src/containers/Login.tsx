import { useQuery } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';

import { localQueries } from '../apollo';
import { Web3Context } from '../contexts/Web3';

export const Login: React.FC = () => {
  const { data, loading } = useQuery(localQueries.GetAuthState);

  const { connectWeb3, disconnect } = useContext(Web3Context);

  const connect = useCallback(() => {
    connectWeb3().catch(console.error);
  }, [connectWeb3]);

  if (loading || data?.authState === 'loading') {
    return <Box>Connecting...</Box>;
  }
  if (data?.authState === 'logged') {
    const { playerId } = data;
    return (
      <Box>
        Connected
        <Link to={`/player/${playerId}`}>
          <button type="button">View my player</button>
        </Link>
        <button type="button" onClick={disconnect}>
          Logout
        </button>
      </Box>
    );
  }
  return (
    <Box>
      <button type="button" onClick={connect}>
        Connect
      </button>
    </Box>
  );
};
