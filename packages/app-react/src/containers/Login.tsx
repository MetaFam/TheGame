import React, {useContext} from 'react';

import { Box } from '@material-ui/core';

import { Web3Context } from "../contexts/Web3";

export default function Login() {
  const { address, connectWeb3 } = useContext(Web3Context);

  if(address) {
    return (
      <Box>Connected as {address}</Box>
    );
  }

  return (
    <Box>
      <button onClick={connectWeb3}>Connect</button>
    </Box>
  )
}
