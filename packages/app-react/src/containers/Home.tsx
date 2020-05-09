import React from 'react';

import { Box } from '@material-ui/core';

import PlayerList from './PlayerList';

export const Home: React.FC = () => {
  return (
    <Box>
      <PlayerList/>
    </Box>
  );
};

