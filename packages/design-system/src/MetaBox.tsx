import { Box, Text } from '@chakra-ui/core';
import React from 'react';

export type MetaBoxProps = {
  title: string;
  children: React.ReactNode;
};

export const MetaBox: React.FC<MetaBoxProps> = ({ children, title }) => (
  <Box>
    <Box bg="purpleBoxLight" p={4}>
      <Text
        fontFamily="mono"
        fontSize="sm"
        fontWeight="bold"
        color="blueLight"
        as="div"
      >
        {title}
      </Text>
    </Box>
    <Box bg="purpleBoxDark" p={6}>
      {children}
    </Box>
  </Box>
);
