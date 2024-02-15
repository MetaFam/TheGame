import { AvatarProps, Box, Flex, Image } from '@metafam/ds';

type RoundImageProps = AvatarProps & {
  src?: string;
};

export const RoundImage: React.FC<RoundImageProps> = ({ src, ...props }) => (
  <Flex
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
    {...props}
  >
    <Image
      position="absolute"
      bg="#1B0D2A"
      borderRadius="50%"
      w="100%"
      height="full"
      objectFit="cover"
      {...{ src }}
    />
  </Flex>
);
