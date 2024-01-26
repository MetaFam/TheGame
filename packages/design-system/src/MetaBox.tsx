import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export type MetaBoxProps = {
  title: string;
  children: React.ReactNode;
};

export const MetaBox: React.FC<MetaBoxProps> = ({ children, title }) => (
  <Box>
    <Box bg="purpleBoxLight" borderTopRadius="lg" p={4}>
      <Text fontSize="sm" fontWeight="bold" color="blueLight" as="div">
        {title}
      </Text>
    </Box>
    <Box bg="purpleBoxDark" borderBottomRadius="lg" p={6}>
      {children}
    </Box>
  </Box>
);
