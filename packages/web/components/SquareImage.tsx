import { AvatarProps, Flex } from '@metafam/ds';
import Image from 'next/image';
import React from 'react';

type SquareImageProps = AvatarProps & {
  src?: string;
};

export const SquareImage: React.FC<SquareImageProps> = ({ src, ...props }) => (
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
      width={100}
      height={100}
      quality={100}
      style={{
        position: 'absolute',
        borderRadius: '0.75rem 0.75rem 0 0',
        fontSize: 'xx-small',
        height: '100%',
        width: '100%',
      }}
      src={src || ''}
      alt="profile-img"
    />
  </Flex>
);
