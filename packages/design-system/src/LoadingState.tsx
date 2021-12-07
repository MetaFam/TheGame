import { Flex, FlexProps, Spinner } from '@chakra-ui/react';
import React from 'react';

export const LoadingState: React.FC<
  FlexProps & {
    color?: string;
  }
> = ({ color = 'purple.500', ...props }) => (
  <Flex w="100%" h="100%" justify="center" align="center" {...props}>
    <Spinner {...{ color }} size="xl" />
  </Flex>
);
