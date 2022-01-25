import { Center, CenterProps, Spinner } from '@chakra-ui/react';
import React from 'react';

export const LoadingState: React.FC<
  CenterProps & {
    color?: string;
  }
> = ({ color = 'purple.500', ...props }) => (
  <Center w="fill-content" h="100%" justify="center" align="center" {...props}>
    <Spinner {...{ color }} size="xl" thickness="4px" speed="1.5s" />
  </Center>
);
