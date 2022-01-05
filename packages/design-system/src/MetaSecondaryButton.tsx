import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

type LinkProps = { href?: string; target?: '_blank' };
type RefProps = { ref?: React.Ref<HTMLButtonElement> };

export const MetaSecondaryButton: React.FC<
  ButtonProps & LinkProps & RefProps
> = React.forwardRef<HTMLButtonElement>(({ children, ...props }, ref) => (
  <Button
    colorScheme="purple"
    textTransform="uppercase"
    px={12}
    letterSpacing="0.1em"
    size="lg"
    lineHeight="28px"
    fontWeight={600}
    fontFamily="Exo 2"
    fontSize="18px"
    bg="#4F69CD"
    color="white"
    ref={ref}
    {...props}
  >
    {children}
  </Button>
));
