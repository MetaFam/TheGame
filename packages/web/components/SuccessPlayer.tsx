import { Button, Flex, Image, Text } from '@metafam/ds';
import React from 'react';

import AvatarImage from '../public/images/avatar.png';
import { MetaLink } from './Link';

export const SuccessPlayer: React.FC = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width="100%"
      height="100%"
    >
      <Text
        fontSize="2xl"
        fontFamily="mono"
        fontWeight="bold"
        color="white"
        m={5}
      >
        Success!
      </Text>
      <Image margin="10" src={AvatarImage} />
      <Button
        marginTop="5"
        marginBottom="8"
        variantColor="fauxblue"
        size="lg"
        textTransform="uppercase"
        paddingLeft="3rem"
        letterSpacing="0.1rem"
        paddingRight="3rem"
        fontSize="sm"
      >
        Set up your profile
      </Button>
      <Text fontFamily="heading" color="offwhite.50">
        {`I'll do this later. `}
        <MetaLink fontFamily="heading" href="" color="cyan.400">
          Go to my profile
        </MetaLink>
      </Text>
    </Flex>
  );
};
