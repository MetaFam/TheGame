import { AvatarProps, Flex } from '@metafam/ds';
import React from 'react';

type SquareImageProps = AvatarProps & {
  src?: string;
};

export const SquareImage: React.FC<SquareImageProps> = ({ src }) => (
  <Flex
    position="relative"
<<<<<<< HEAD
    marginTop="0 !important"
=======
    // marginTop="0 !important"
>>>>>>> 86629af0 (make all card images square & clickable)
    _after={{
      content: '""',
      display: 'block',
      paddingBottom: '100%',
    }}
  >
    <img
      style={{
        position: 'absolute',
<<<<<<< HEAD
        borderRadius: '10px 10px 0 0',
=======
>>>>>>> 86629af0 (make all card images square & clickable)
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      src={src}
    />
  </Flex>
);
