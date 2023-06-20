import { AvatarProps, Flex, Image } from '@metafam/ds';
import React from 'react';

type RoundImageProps = AvatarProps & {
  src?: string;
};

export const RoundImage: React.FC<RoundImageProps> = ({ src, ...props }) => (
  <Flex
    {...props}
    position="relative"
    mt="0 !important"
    _after={{
      content: '""',
      display: 'block',
      paddingBottom: '100%',
    }}
  >
    <Image
      position="absolute"
      borderRadius="50%"
      // width="full"
      w="100%"
      height="full"
      objectFit="cover"
      {...{ src }}
    />
  </Flex>
);
