import { Flex, FlexProps, StackProps, VStack } from '@chakra-ui/react';
import React from 'react';

export const MetaTileHeader: React.FC<StackProps> = ({
  children,
  ...props
}) => (
  <VStack
    w="100%"
    spacing="6"
    align="stretch"
    mb={6}
    position="relative"
    {...props}
  >
    {children}
  </VStack>
);

export const MetaTileBody: React.FC<StackProps> = ({ children, ...props }) => (
  <VStack w="100%" spacing="6" align="stretch" {...props}>
    {children}
  </VStack>
);

export const MetaTile: React.FC<FlexProps> = ({ children, ...props }) => (
  <Flex
    direction="column"
    bg="whiteAlpha.200"
    style={{ backdropFilter: 'blur(7px)' }}
    rounded="lg"
    p={6}
    maxW="25rem" // (2 / 3.5) = ~0.571 aspect ratio desired
    w="100%"
    align="stretch"
    position="relative"
    overflow="hidden"
    justify="space-between"
    {...props}
  >
    {children}
  </Flex>
);
