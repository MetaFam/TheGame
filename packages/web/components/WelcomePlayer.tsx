import { Button, Flex, Image, Text } from '@metafam/ds';
import React from 'react';

import PlayersImage from '../public/images/players.png';

type Props = {
  next: () => void;
};

export const WelcomePlayer: React.FC<Props> = ({ next }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      flex={1}
      maxWidth="45rem"
    >
      <Image src={PlayersImage} />
      <Text
        fontSize="2xl"
        fontFamily="mono"
        fontWeight="bold"
        color="white"
        m={5}
      >
        Become a Player
      </Text>
      <Text fontSize="lg" fontFamily="body" color="white" textAlign="center">
        MetaGame is an idea we can build a new world, a layer atop of the old
        one. A more collaborative, transparent & caring world. A world in which
        self-interest is better aligned with the common good & the ones creating
        value are more directly rewarded.
      </Text>
      <Button
        onClick={() => {
          next();
        }}
        marginTop="10"
        variantColor="fauxblue"
        size="lg"
        textTransform="uppercase"
        paddingLeft="3rem"
        letterSpacing="0.1rem"
        paddingRight="3rem"
        fontSize="sm"
      >
        Register
      </Button>
    </Flex>
  );
};
