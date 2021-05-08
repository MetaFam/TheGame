import { Text } from '@chakra-ui/react';
import React from 'react';

export type TextProps = {
  children: React.ReactNode;
};

const H1: React.FC<TextProps> = ({ children }) => (
  <Text fontFamily="body" fontSize="2xl" fontWeight="bold" mb={4}>
    {children}
  </Text>
);

const P: React.FC<TextProps> = ({ children }) => <Text>{children}</Text>;

export { H1, P };
