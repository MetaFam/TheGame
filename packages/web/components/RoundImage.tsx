import { AvatarProps, Flex } from '@metafam/ds';
import Image from 'next/image';
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
    border="2px"
    borderRadius="50%"
    borderColor="whiteAlpha.400"
    _hover={{ bgGradient: 'linear(to-r, #7900FD, #FC01FC)' }}
  >
    <Image
      height={100}
      width={100}
      style={{
        position: 'absolute',
        backgroundColor: '#1B0D2A',
        borderRadius: '50%',
        fontSize: 'xx-small',
        objectFit: 'cover',
      }}
      alt="user-image"
      src={src || ''}
    />
  </Flex>
);
