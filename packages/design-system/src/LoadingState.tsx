import { Flex, Spinner } from '@chakra-ui/core';
import React from 'react';

export const LoadingState: React.FC = () => (
  <Flex w="100%" h="100%" justify="center" align="center">
    <Spinner color="purple.500" size="xl" />
  </Flex>
);
