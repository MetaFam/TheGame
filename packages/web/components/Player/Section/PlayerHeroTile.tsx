import { Box, BoxProps, HStack, Text } from '@metafam/ds';

type Props = {
  title: string;
  // shim b/c I'm getting an error I don't understand
  // when specifying `align` as an attribute
  align?: string;
};

export const PlayerHeroTile: React.FC<Props & BoxProps> = ({
  children,
  title,
  ...props
}) => (
  <Box w="full" {...props}>
    <Text fontSize="md" color="blueLight" mb={1} whiteSpace="nowrap">
      {title}
    </Text>
    <HStack alignItems="baseline" fontSize="lg">
      {children}
    </HStack>
  </Box>
);
