import { SimpleGrid } from '@metafam/ds';
import { PlayerTile } from 'components/Player/PlayerTile';
import { Player } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  players: Player[];
};

export const PlayerList: React.FC<Props> = ({ players }) => (
  <SimpleGrid
    columns={[1, null, 2, 3]}
    spacing={8}
    autoRows="minmax(35rem, auto)"
  >
    {players.map((player, idx) => (
      <PlayerTile key={player.profile?.username ?? idx} {...{ player }} />
    ))}
  </SimpleGrid>
);
