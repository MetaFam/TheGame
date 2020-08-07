import { Button, ButtonProps } from '@chakra-ui/core';
import React from 'react';

export const MetaButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    colorScheme="purple"
    textTransform="uppercase"
    px={12}
    letterSpacing="0.1rem"
    size="lg"
    fontSize="sm"
    {...props}
  >
    {children}
  </Button>
);
