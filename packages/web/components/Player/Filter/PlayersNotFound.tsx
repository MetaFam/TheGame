import { Image, Text, VStack } from '@metafam/ds';
import PlayersNotFoundImage from 'assets/no-players-found.svg';
import React from 'react';

export const PlayersNotFound: React.FC = () => (
  <VStack
    w="100%"
    maxW="79rem"
    p={{ base: 8, md: 16 }}
    spacing={{ base: 4, md: 6 }}
    color="white"
    borderRadius="0.5rem"
    bg="blackAlpha.500"
  >
    <Image src={PlayersNotFoundImage} />
    <Text fontWeight="bold" fontSize="xl" textAlign="center">
      No players found
    </Text>
    <Text textAlign="center">
      It seems we can’t find any players that match the filters you selected.
    </Text>
  </VStack>
);
