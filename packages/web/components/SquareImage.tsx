import { AvatarProps, Flex } from '@metafam/ds';
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
    <img
      style={{
        position: 'absolute',
        borderRadius: '10px 10px 0 0',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      src={src}
    />
  </Flex>
);
