import { Heading, HeadingProps } from '@chakra-ui/core';
import React from 'react';

export const MetaHeading: React.FC<HeadingProps> = ({ children, ...props }) => (
  <Heading size="lg" textAlign="center" fontWeight="normal" {...props}>
    {children}
  </Heading>
);
