import { Box, HStack, Text } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaGlobe } from 'react-icons/fa';
import spacetime from 'spacetime';
import { display } from 'spacetime-informal';

type Props = {
  player: PlayerFragmentFragment;
};

export const PlayerTimeZone: React.FC<Props> = ({ player }) => {
  let tzLabel = '-';
  let offsetLabel = null;
  if (player.tz) {
    const a = spacetime.now().goto(player.tz)
    const tzDisplay = display(player.tz)
    if (tzDisplay && tzDisplay.daylight && tzDisplay.standard) {
      tzLabel = a.isDST()
        ? tzDisplay.daylight.abbrev
        : tzDisplay.standard.abbrev;
      const {offset} = a.timezone().current;
      if (offset > 0) {
        offsetLabel = `(GMT +${offset})`;
      } else if (offset < 0) {
        offsetLabel = `(GMT ${offset})`;
      }
    } else {
      tzLabel = player.tz;
    }
  }
  
  return (
    <Box ml={1}>
      <Text fontSize="xs" color="blueLight" casing="uppercase" mb={3}>
        time zone
      </Text>
      <HStack alignItems="baseline">
        <FaGlobe color="blueLight" />
        <Text fontSize="xl" mb="1">{tzLabel}</Text>
        {offsetLabel ? <Text fontSize="xs" mr={3}>{offsetLabel}</Text> : ''}
      </HStack>
    </Box>
  );
};
