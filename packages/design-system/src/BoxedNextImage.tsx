import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import React from 'react';

export const BoxedNextImage: React.FC<
  | React.ComponentProps<typeof Box>
  | { src: string | number; alt: string | number }
> = (props) => {
  const { src, alt } = props;
  return (
    <Box
      pos="relative"
      {...{ ...props, src: undefined, alt: undefined }}
      style={{
        objectFit: 'contain',
      }}
    >
      <NextImage {...{ src, alt }} layout="fill" objectFit="contain" />
    </Box>
  );
};
