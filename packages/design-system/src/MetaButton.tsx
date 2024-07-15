import { Button, ButtonProps } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

type LinkProps = { href?: string; target?: '_blank' };
type RefProps = { ref?: React.Ref<HTMLButtonElement> };
export type MetaButtonProps = PropsWithChildren<ButtonProps & LinkProps & RefProps>;

export const MetaButton = (
  React.forwardRef<HTMLButtonElement, MetaButtonProps>(
    ({ children, ...props }, ref) => {
      const args = props;
      if (args.href) {
        args.as = 'a';
      }

      return (
        <Button
          colorScheme="purple"
          textTransform="uppercase"
          px={12}
          letterSpacing="0.1em"
          size="lg"
          fontSize="sm"
          bg="purple.400"
          color="white"
          {...{ ref, ...args }}
        >
          {children}
        </Button>
      );
    },
  )
);

export default MetaButton;
