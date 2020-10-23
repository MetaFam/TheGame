import { Container, Divider, MetaTag, Wrap } from '@metafam/ds';
import { PlayerFeature } from 'components/Player/PlayerFeature';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = { player: PlayerFragmentFragment };

export const PlayerFeatures: React.FC<Props> = ({ player }) => {
  return (
    <Container maxW="xl">
      <Wrap
        spacing="8"
        ml={{ base: '4', lg: '64' }}
        pt={{ base: '4', md: '12', lg: 0 }}
      >
        <PlayerFeature
          title="XP"
          value={Math.floor(player.totalXp).toString()}
        />
        {player.rank && (
          <>
            <Divider orientation="vertical" color="whiteAlpha.400" />
            <PlayerFeature title="Rank">
              <MetaTag
                backgroundColor={player.rank?.toLowerCase()}
                size="md"
                color="blackAlpha.600"
              >
                {player.rank}
              </MetaTag>
            </PlayerFeature>
          </>
        )}
        {player.box_profile?.location && (
          <>
            <Divider orientation="vertical" color="whiteAlpha.400" />

            <PlayerFeature
              title="Location"
              value={player.box_profile?.location}
            />
          </>
        )}
        <Divider orientation="vertical" color="whiteAlpha.400" />
        {/* <PlayerFeature title="Role" value="N/A" color="whiteAlpha.500" /> */}
        {/* <Divider orientation="vertical" color="whiteAlpha.400" /> */}
        <PlayerFeature
          title="Availability"
          value={
            player.availability_hours != null
              ? `${player.availability_hours} hr / week`
              : 'N/A'
          }
          color={player.availability_hours ? undefined : 'whiteAlpha.500'}
        />
      </Wrap>
    </Container>
  );
};
