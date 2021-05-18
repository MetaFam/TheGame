import { SimpleGrid, Text } from '@metafam/ds';
import { PlayerTile } from 'components/Player/PlayerTile';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  players: PlayerFragmentFragment[];
};

export const PlayerList: React.FC<Props> = ({ players }) =>
  players.length > 0 ? (
    <SimpleGrid
      columns={[1, null, 2, 3]}
      spacing="8"
      autoRows="minmax(35rem, auto)"
    >
      {players.map((p) => (
        <PlayerTile key={p.username} player={p} />
      ))}
    </SimpleGrid>
  ) : (
    <Text>No players found</Text>
  );
