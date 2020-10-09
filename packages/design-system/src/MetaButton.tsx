import { Button, ButtonProps } from '@chakra-ui/core';
import React from 'react';

export const MetaButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    bgColor="purple.400"
    _hover={{ bgColor: 'purple.500' }}
    textTransform="uppercase"
    px={12}
    letterSpacing="0.1em"
    size="lg"
    fontSize="sm"
    {...props}
  >
    {children}
  </Button>
);
