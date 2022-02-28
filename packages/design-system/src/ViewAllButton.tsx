import { Text } from '@chakra-ui/react';
import React from 'react';

export const ViewAllButton: React.FC<{
  onClick: () => void;
  size?: string | number;
}> = ({ onClick, size }) => (
  <Text
    as="span"
    p={1.5}
    fontSize="xs"
    color="cyanText"
    cursor="pointer"
    borderRadius="md"
    border="2px solid transparent"
    _hover={{
      color: 'purple.800',
      bg: '#FFFFFF66',
      borderColor: 'purple.600',
    }}
    mr={[2, 0]}
    {...{ onClick }}
  >
    View All{size != null ? ` (${size})` : null}
  </Text>
);

export default ViewAllButton;
