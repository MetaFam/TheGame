import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

type LinkProps = { href?: string; target?: '_blank' };

export const MetaButton: React.FC<ButtonProps & LinkProps> = ({
  children,
  ...props
}) => (
  <Button
    colorScheme="purple"
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
