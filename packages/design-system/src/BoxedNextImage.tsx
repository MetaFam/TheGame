import { Box } from '@chakra-ui/react';
import { StaticImageData } from 'next/image';
import NextImage from 'next/legacy/image';


export const BoxedNextImage: React.FC<
  React.ComponentProps<typeof Box> & {
    src: string | StaticImageData;
    alt?: string;
  }
> = ({ src, alt, ...props }) => (
  <Box
    pos="relative"
    {...props}
    style={{
      objectFit: 'contain',
    }}
  >
    <NextImage {...{ src, alt }} layout="fill" objectFit="contain" />
  </Box>
);
