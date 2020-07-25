import { Box } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export const PlayerListItem: React.FC<{ player: any }> = ({ player }) => (
  <Box>
    {player.username}
    <Link to={`/player/${player.id}`}>
      <button type="button">View player</button>
    </Link>
  </Box>
);
