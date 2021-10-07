import { Box, HStack, Text } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React, { useMemo } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { getPlayerTimeZoneDisplay } from 'utils/dateHelpers';

type Props = {
  player: PlayerFragmentFragment;
};

export const PlayerTimeZone: React.FC<Props> = ({ player }) => {
  const tzDisplay = useMemo(() => getPlayerTimeZoneDisplay(player.timezone), [
    player.timezone,
  ]);

  return (
    <HStack alignItems="baseline">
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
    </HStack>
  );
};
