import React from 'react';

import { Box } from '@material-ui/core';

import {useQuery} from '@apollo/react-hooks';

import queries from '../graphql/queries';

import Player from '../components/Player';

export default function PlayerList() {
  const { data, loading } = useQuery(queries.get_Player);

  if(loading) {
    return <div>loading</div>
  }
  return (
    <Box>
      <h4>Player list</h4>
      {data.Player.map((player: any) =>
        <Player key={player.id} player={player} />
      )}
    </Box>
  )
}
