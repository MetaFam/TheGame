import { AvatarProps, Flex, Image } from '@metafam/ds';
import React from 'react';

type SquareImageProps = AvatarProps & {
  src?: string;
};

export const SquareImage: React.FC<SquareImageProps> = ({ src }) => (
  <Flex
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
      borderRadius="10px 10px 0 0"
      width="full"
      height="full"
      objectFit="cover"
      {...{ src }}
    />
  </Flex>
);
