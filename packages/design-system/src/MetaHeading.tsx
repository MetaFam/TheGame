import { Text, TextProps } from '@chakra-ui/core';
import React from 'react';

export const MetaHeading: React.FC<TextProps> = ({ children, ...props }) => (
  <Text fontSize="2xl" fontFamily="mono" fontWeight="bold" {...props}>
    {children}
  </Text>
);
