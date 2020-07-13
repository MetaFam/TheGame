import { Box } from '@material-ui/core';
import React from 'react';

import { PlayerList } from './PlayerList';

export const Home: React.FC = () => {
  return (
    <Box>
      <PlayerList />
    </Box>
  );
};
