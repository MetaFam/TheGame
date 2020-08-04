import { Button, ButtonGroup, Flex, Text } from '@metafam/ds';
import React from 'react';

import { Icon3box } from './icons/Icon3box';

export const RegisterPlayer: React.FC = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      flex={1}
    >
      <Text
        fontSize="2xl"
        fontFamily="mono"
        fontWeight="bold"
        color="white"
        m={5}
      >
        Register your Player account
      </Text>
      <ButtonGroup spacing={5} marginTop="20">
        <Button
          color="white"
          variant="outline"
          size="lg"
          padding="2rem"
          width="8rem"
          leftIcon={Icon3box}
          textTransform="uppercase"
          alignItems="center"
        >
          box
        </Button>
        <Button
          color="white"
          variant="outline"
          size="lg"
          padding="2rem"
          width="8rem"
        >
          GitHub
        </Button>
        <Button
          color="white"
          variant="outline"
          size="lg"
          padding="2rem"
          leftIcon="email"
          width="8rem"
        >
          Email
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
