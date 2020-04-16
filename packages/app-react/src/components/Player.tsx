import React from 'react';

import { Box } from '@material-ui/core';

export default function Player({ player }: { player: any }) {
  return (
    <Box>
      {player.id}
    </Box>
  )
}
