import { useQuery } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';

import { PlayerDetails } from '../components/PlayerDetails';
import { GetPlayer } from '../graphql/queries';

export const Player: React.FC = () => {
  const { playerId } = useParams();
  const { data, loading, error } = useQuery(GetPlayer, {
    variables: {
      player_id: playerId,
    },
  });

  if (error) {
    return <div>error</div>;
  }
  if (loading) {
    return <div>loading</div>;
  }

  const myPlayer = data.Player[0];
  return (
    <Box>
      <h4>Player</h4>
      <PlayerDetails player={myPlayer} />
    </Box>
  );
};
