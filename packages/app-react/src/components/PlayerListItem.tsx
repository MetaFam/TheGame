import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@material-ui/core';
import {getPlayerETHAddress} from "../utils/players";

export default function PlayerListItem({ player, playerNames }: { player: any, playerNames: any }) {

  const ethAddress = getPlayerETHAddress(player);
  const name = playerNames[ethAddress.toLowerCase()];

  return (
    <Box>
      {name || player.id}
      <Link to={`/player/${player.id}`}><button>View player</button></Link>
    </Box>
  )
}
