import { Heading, HeadingProps } from '@chakra-ui/core';
import React from 'react';

export const MetaHeading: React.FC<HeadingProps> = ({ children, ...props }) => (
  <Heading size="lg" textAlign="center" {...props}>
    {children}
  </Heading>
);
