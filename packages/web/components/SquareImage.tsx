import { AvatarProps, Box, Flex, Image } from '@metafam/ds';

type SquareImageProps = AvatarProps & {
  src?: string;
};

export const SquareImage: React.FC<SquareImageProps> = ({ src, ...props }) => (
  <Box
    as={Flex}
    position="relative"
    mt="0 !important"
    _after={{
      content: '""',
      display: 'block',
      paddingBottom: '100%',
    }}
    {...props}
  >
    <Image
      position="absolute"
      borderRadius="0.75rem 0.75rem 0 0"
      // width="full"
      w="100%"
      height="full"
      objectFit="cover"
      {...{ src }}
    />
  </Box>
);
