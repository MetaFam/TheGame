import React from 'react';

import { Box } from '@material-ui/core';

import Player from '../components/Player';
import { useMyPlayer } from '../graphql/hooks';

export default function MyPlayer() {
  const { data, loading, error } = useMyPlayer();

  if(error) {
    return <div>error</div>
  }
  if(loading) {
    return <div>loading</div>
  }
  return (
    <Box>
      <h4>My player</h4>
      {data.Player.map((player: any) =>
        <Player key={player.id} player={player} />
      )}
    </Box>
  )
}
