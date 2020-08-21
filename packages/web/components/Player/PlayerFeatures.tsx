import { Badge, Divider, Wrap } from '@metafam/ds';
import { MaxWidthContainer } from 'components/Container';
import { PlayerFeature } from 'components/Player/PlayerFeature';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = { player: PlayerFragmentFragment };

export const PlayerFeatures: React.FC<Props> = ({ player }) => {
  return (
    <MaxWidthContainer>
      <Wrap
        spacing="2rem"
        ml={[0, 0, 0, '15rem']}
        pt={['3rem', '3rem', '3rem', 0]}
      >
        <PlayerFeature
          title="XP"
          value={Math.floor(player.totalXp).toString()}
        />
        <Divider orientation="vertical" color="#554671" />
        <PlayerFeature title="Level">
          <Badge backgroundColor={player.rank?.toLowerCase()} fontSize="sm">
            {player.rank}
          </Badge>
        </PlayerFeature>
        <Divider orientation="vertical" color="#554671" />
        <PlayerFeature title="Role" value="Define your role" />
        <Divider orientation="vertical" color="#554671" />
        <PlayerFeature title="Timezone" value="Define your timezone" />
        <Divider orientation="vertical" color="#554671" />
        <PlayerFeature title="Availability" value="20h / week" />
      </Wrap>
    </MaxWidthContainer>
  );
};
