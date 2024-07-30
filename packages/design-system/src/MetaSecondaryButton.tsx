import { Button, ButtonProps } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

type LinkProps = { href?: string; target?: '_blank' };
type RefProps = { ref?: React.Ref<HTMLButtonElement> };
type MetaSecondaryButtonProps = PropsWithChildren<
  ButtonProps & LinkProps & RefProps
>;

export const MetaSecondaryButton =
  React.forwardRef<HTMLButtonElement, MetaSecondaryButtonProps>(
    ({ children, ...props }, ref) => (
      <Button
        colorScheme="secondaryBlue"
        textTransform="uppercase"
        px={12}
        letterSpacing="0.1em"
        size="lg"
        fontSize="sm"
        bg="secondaryBlue.400"
        color="white"
        {...{ ref, ...props }}
      >
        {children}
      </Button>
    ),
  );
