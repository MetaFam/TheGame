import React from 'react';

import { Box } from '@material-ui/core';

import {useQuery} from '@apollo/react-hooks';

import queries from '../graphql/queries';

import PlayerListItem from '../components/PlayerListItem';

export default function PlayerList() {
  const { data, loading, error } = useQuery(queries.get_Player);

  if(error) {
    return <div>error: {error.message}</div>
  }
  if(loading) {
    return <div>loading</div>
  }
  return (
    <Box>
      <h4>Player list</h4>
      {data.Player.map((player: any) =>
        <PlayerListItem key={player.id} player={player} />
      )}
    </Box>
  )
}
