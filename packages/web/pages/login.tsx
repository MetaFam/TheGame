import { Flex, Image, SimpleGrid, Text } from '@metafam/ds';
import React from 'react';

import { MetaLink } from '../components/Link';
import BackgroundImage from '../public/images/background.png';
import MetaGameImage from '../public/images/metagame.png';
import PlayersImage from '../public/images/players.png';

const Login: React.FC = () => (
  <Flex
    backgroundSize="cover"
    backgroundImage={`url(${BackgroundImage})`}
    width="100vw"
    height="100vh"
    padding="3rem"
    flexDirection="column"
    alignItems="center"
  >
    <SimpleGrid columns={3} alignItems="center" width="100%">
      <MetaLink fontFamily="heading" href="" color="#79F8FB">
        How to play MetaGame
      </MetaLink>
      <Flex justifyContent="center" alignItems="center">
        <Image src={MetaGameImage} />
      </Flex>
      <Flex alignItems="center" justifyContent="flex-end">
        <Text fontFamily="heading" color="#F6F8F9">
          Already a Player?{' '}
          <MetaLink fontFamily="heading" href="" color="#79F8FB">
            Sign in
          </MetaLink>
        </Text>
      </Flex>
    </SimpleGrid>
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      flex={1}
      maxWidth="45rem"
    >
      <Image src={PlayersImage} />
      <Text
        fontSize="3xl"
        fontFamily="mono"
        fontWeight="bold"
        color="#FFFFFF"
        m={5}
      >
        Become a Player
      </Text>
      <Text fontSize="lg" fontFamily="body" color="#FFFFFF" textAlign="center">
        MetaGame is an idea we can build a new world, a layer atop of the old
        one. A more collaborative, transparent & caring world. A world in which
        self-interest is better aligned with the common good & the ones creating
        value are more directly rewarded.
      </Text>
    </Flex>
  </Flex>
);

export default Login;
