import { Flex } from '@metafam/ds';
import React from 'react';

export const PageContainer: React.FC<typeof Flex> = ({
  children,
  ...props
}) => (
  <Flex
    bgSize="cover"
    w="100vw"
    h="100vh"
    p={12}
    direction="column"
    align="center"
    {...props}
  >
    {children}
  </Flex>
);

export const FlexContainer: React.FC<typeof Flex> = ({
  children,
  ...props
}) => (
  <Flex align="center" justify="center" direction="column" {...props}>
    {children}
  </Flex>
);
