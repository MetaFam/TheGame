import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';

import {useQuery} from '@apollo/react-hooks';

import queries from '../graphql/queries';

import PlayerListItem from '../components/PlayerListItem';
import ThreeBox from "3box";
import {getPlayerETHAddress} from "../utils/players";

export default function PlayerList() {
  const { data, loading, error } = useQuery(queries.get_Player);
  const [playerNames, setPlayerNames] = useState({});

  // Loads every player names once via 3box graphql. Quite slow and complex.
  useEffect(() => {
    if(!data) return;

    (async () => {
      const playerAddresses: string = data.Player
        .map(getPlayerETHAddress)
        .map((s: string) => `"${s}"`)
        .join(',');

      const profilesData = await ThreeBox.profileGraphQL(`
        query GetProfiles {
          profiles(ids: [${playerAddresses}]){
            name
            eth_address
          }
        }
      `);
      const ethToPlayerName = profilesData.profiles.reduce((acc: any, profile: any) => ({
        ...acc,
        [profile.eth_address]: profile.name,
      }), {});
      setPlayerNames(ethToPlayerName);
    })();
  }, [data]);

  if(error) {
    return <div>error: {error.message}</div>
  }
  if(loading) {
    return <div>loading</div>
  }

  return (
    <Box>
      <h4>Player list</h4>
      {data.Player.map((player: any) =>
        <PlayerListItem key={player.id} player={player} playerNames={playerNames} />
      )}
    </Box>
  )
}
