import { Box } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { Login } from '../containers/Login';

export const Header: React.FC = () => (
  <Box>
    <Link to="/">
      <button type="button">Home</button>
    </Link>
    <Login />
  </Box>
);
