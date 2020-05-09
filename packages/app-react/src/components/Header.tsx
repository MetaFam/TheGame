import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@material-ui/core';

import {Login} from "../containers/Login";

export default function Header() {
  return (
    <Box>
      <Link to={`/`}><button>Home</button></Link>
      <Login/>
    </Box>
  )
}
