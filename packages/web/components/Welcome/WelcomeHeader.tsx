import { Flex, Image, SimpleGrid, Text } from '@metafam/ds';
import MetaGameImage from 'assets/metagame.png';
import { MetaLink } from 'components/Link';
import React from 'react';

export const WelcomeHeader: React.FC = () => {
  return (
    <SimpleGrid columns={3} alignItems="center" width="100%" fontFamily="mono">
      <MetaLink href="">How to play MetaGame</MetaLink>
      <Flex justify="center" align="center">
        <Image src={MetaGameImage} alt="MetaGame" mt={-2} w="9rem" />
      </Flex>
      <Flex align="center" justify="flex-end">
        <Text color="offwhite">
          Already a Player? <MetaLink href="">Sign in</MetaLink>
        </Text>
      </Flex>
    </SimpleGrid>
  );
};
