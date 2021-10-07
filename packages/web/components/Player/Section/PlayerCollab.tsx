import { Box, SimpleGrid, Text } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React, { useMemo } from 'react';
import { FaClock, FaGlobe } from 'react-icons/fa';
import { getPlayerTimeZoneDisplay } from 'utils/dateHelpers';

import { PlayerHeroTile } from './PlayerHeroTile';

type Props = { player: PlayerFragmentFragment };
export const PlayerCollab: React.FC<Props> = ({ player }) => {
  const tzDisplay = useMemo(() => getPlayerTimeZoneDisplay(player.timezone), [
    player.timezone,
  ]);

  return (
    <SimpleGrid columns={2} gap={6}>
      <PlayerHeroTile title="Time zone">
        <Box width="1rem">
          <FaGlobe color="blueLight" />
        </Box>
        <Text fontSize={{ base: 'md', sm: 'lg' }}>
          {tzDisplay?.timeZone || '-'}
        </Text>
        {tzDisplay?.offset ? (
          <Text fontSize={{ base: 'xs', sm: 'sm' }}>{tzDisplay?.offset}</Text>
        ) : (
          ''
        )}
        );
      </PlayerHeroTile>
      <PlayerHeroTile title="Availability">
        <Box width="1rem">
          <FaClock color="blueLight" width="1rem" />
        </Box>
        <Text fontSize={{ base: 'md', sm: 'lg' }} fontFamily="mono" mb="1">
          {`${player.availability_hours || '0'} h/week`}
        </Text>
      </PlayerHeroTile>
    </SimpleGrid>
  );
};
