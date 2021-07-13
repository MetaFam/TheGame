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
    <Box ml={1}>
      <Text fontSize="xs" color="blueLight" casing="uppercase" mb={3}>
        time zone
      </Text>
      <HStack alignItems="baseline">
        <FaGlobe color="blueLight" />
        <Text fontSize="xl" mb="1">
          {tzDisplay?.timeZone || '-'}
        </Text>
        {tzDisplay?.offset ? (
          <Text fontSize="xs" mr={3}>
            {tzDisplay?.offset}
          </Text>
        ) : (
          ''
        )}
      </HStack>
    </Box>
  );
};
