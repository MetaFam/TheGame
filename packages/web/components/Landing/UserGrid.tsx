import { Box, Text } from '@metafam/ds';
import { PlayerProfilePicture } from 'components/Player/PlayerProfilePicture';
import { Player } from 'graphql/autogen/types';
import { usePlayerFilter } from 'lib/hooks/player/players';
import React, { useEffect, useState } from 'react';

export default function UserGrid() {
  const { players } = usePlayerFilter();

  const [topPlayers, setTopPlayers] = useState<Player[]>();

  useEffect(() => {
    if (players.length) {
      setTopPlayers(players.slice(0, 7));
    }
  }, [players]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {topPlayers?.length
        ? topPlayers?.map((player, i) => (
            <Box
              key={`user-${i}`}
              sx={{
                width: '20%',
                marginRight: '5%',
                marginBottom: '10px',
              }}
            >
              <PlayerProfilePicture
                {...{ player }}
                size="xxs"
                sx={{ borderRadius: '50px' }}
              />
              <Text sx={{ fontSize: 'xss' }}>{player.profile?.name}</Text>
            </Box>
          ))
        : 'Loading...'}
      <Box
        sx={{
          width: '20%',
          marginRight: '5%',
          marginBottom: '10px',
          borderRadius: '50px',
        }}
      >
        <Text>View All</Text>
      </Box>
    </Box>
  );
}
