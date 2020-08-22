import { Flex } from '@metafam/ds';
import React from 'react';

type Props = React.ComponentProps<typeof Flex>;

export const PageContainer: React.FC<Props> = ({ children, ...props }) => (
  <Flex
    bgSize="cover"
    w="100%"
    h="100vh"
    p={[4, 8, 12]}
    direction="column"
    align="center"
    {...props}
  >
    {children}
  </Flex>
);

export const FlexContainer: React.FC<Props> = ({ children, ...props }) => (
  <Flex align="center" justify="center" direction="column" {...props}>
    {children}
  </Flex>
);
