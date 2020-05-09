import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@material-ui/core';

export default function PlayerListItem({ player }: { player: any }) {
  return (
    <Box>
      {player.id}
      <Link to={`/player/${player.id}`}><button>View player</button></Link>
    </Box>
  )
}
