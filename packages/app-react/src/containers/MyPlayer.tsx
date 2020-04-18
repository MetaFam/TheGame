import React from 'react';

import { Box } from '@material-ui/core';

import Player from '../components/Player';
import { useMyPlayer } from '../graphql/hooks';

export const MyPlayer: React.FC = () => {
  const { data, called, loading, error } = useMyPlayer();

  if(error) {
    return <div>error</div>
  }
  if(loading || !called) {
    return <div>loading</div>
  }

  const myPlayer = data.Player[0];
  return (
    <Box>
      <h4>My player</h4>
      <Player player={myPlayer} />
    </Box>
  )
};

