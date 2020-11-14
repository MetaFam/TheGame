import { Box, HStack, Text } from '@metafam/ds';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

export type PlayerBoxProps = {
  title?: string;
  children?: React.ReactNode;
  setRemoveBox?: () => void;
};

// TODO If MetaBox is only used for Player profile maybe merge both component
export const PlayerBox: React.FC<PlayerBoxProps> = ({
  children,
  title,
  setRemoveBox,
}) => (
  <Box>
    {!!title && (
      <Box bg="rgba(70, 20, 100, 0.8)" borderTopRadius="lg" p={4}>
        <HStack>
          <Text
            fontFamily="mono"
            fontSize="sm"
            fontWeight="bold"
            color="blueLight"
            as="div"
            mr="auto"
          >
            {title}
          </Text>
          <FaTimes
            color="#A5B9F6"
            opacity="0.4"
            cursor="pointer"
            onClick={setRemoveBox}
          />
        </HStack>
      </Box>
    )}
    <Box
      bg="whiteAlpha.200"
      borderBottomRadius="lg"
      borderTopRadius={!title ? 'lg' : 0}
      p={6}
      boxShadow="md"
      css={{ backdropFilter: 'blur(8px)' }}
    >
      {children}
    </Box>
  </Box>
);
