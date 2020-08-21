import { Badge, Container, Divider, Wrap } from '@metafam/ds';
import { PlayerFeature } from 'components/Player/PlayerFeature';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = { player: PlayerFragmentFragment };

export const PlayerFeatures: React.FC<Props> = ({ player }) => {
  return (
    <Container maxW="xl">
      <Wrap spacing="8" ml={{ base: 0, xl: '64' }} pt={{ base: '12', xl: 0 }}>
        <PlayerFeature
          title="XP"
          value={Math.floor(player.totalXp).toString()}
        />
        <Divider orientation="vertical" color="whiteAlpha.400" />
        <PlayerFeature title="Level">
          <Badge backgroundColor={player.rank?.toLowerCase()} fontSize="sm">
            {player.rank}
          </Badge>
        </PlayerFeature>
        <Divider orientation="vertical" color="whiteAlpha.400" />
        <PlayerFeature title="Role" value="Define your role" />
        <Divider orientation="vertical" color="whiteAlpha.400" />
        <PlayerFeature title="Timezone" value="Define your timezone" />
        <Divider orientation="vertical" color="whiteAlpha.400" />
        <PlayerFeature title="Availability" value="20h / week" />
      </Wrap>
    </Container>
  );
};
