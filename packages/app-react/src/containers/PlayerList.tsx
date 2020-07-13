import { useQuery } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import React from 'react';

import { PlayerListItem } from '../components/PlayerListItem';
import { GetPlayer } from '../graphql/queries';

export const PlayerList: React.FC = () => {
  const { data, loading, error } = useQuery(GetPlayer);

  if (error) {
    return <div>error: {error.message}</div>;
  }
  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Box>
      <h4>Player list</h4>
      {data.Player.map((player: any) => (
        <PlayerListItem key={player.id} player={player} />
      ))}
    </Box>
  );
};
