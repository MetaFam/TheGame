import React from 'react';

import { Box } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';

import PlayerList from './PlayerList';
import { Login } from './Login';
import { MyPlayer } from './MyPlayer';
import {localQueries} from "../apollo";

export const Home: React.FC = () => {
  const { data, loading } = useQuery(localQueries.get_authState);

  return (
    <Box>
      <PlayerList/>
      <Login/>
      {!loading && data?.authState === 'logged' && <MyPlayer/>}
    </Box>
  );
};

