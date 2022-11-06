import { Flex, FlexProps, StackProps, VStack } from '@chakra-ui/react';
import React from 'react';

export const MetaTileHeader: React.FC<StackProps> = ({
  children,
  ...props
}) => (
  <VStack
    w="full"
    spacing="6"
    align="stretch"
    position="relative"
    {...props}
    borderTopRadius={10}
    bgColor="rgba(255, 255, 255, 0.2)"
  >
    {children}
  </VStack>
);

export const MetaTileBody: React.FC<StackProps> = ({ children, ...props }) => (
  <VStack
    w="full"
    spacing={3}
    align="stretch"
    p={3}
    pt={8}
    borderBottomRadius={10}
    bgColor="rgba(255, 255, 255, 0.06)"
    style={{ backdropFilter: 'blur(10px)' }}
    {...props}
  >
    {children}
  </VStack>
);

export const MetaTile: React.FC<FlexProps> = ({ children, ...props }) => (
  <Flex
    direction="column"
    bg="rgba(255, 255, 255, 0.06)"
    style={{ backdropFilter: 'blur(7px)' }}
    rounded="lg"
    p={6}
    maxW="25rem" // (2 / 3.5) = ~0.571 aspect ratio desired
    w="full"
    h="full"
    align="stretch"
    position="relative"
    // overflow="hidden"
    justify="space-between"
    {...props}
  >
    {children}
  </Flex>
);
