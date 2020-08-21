import { Box, Flex } from '@metafam/ds';
import React from 'react';

type Props = React.ComponentProps<typeof Flex>;
type BoxProps = React.ComponentProps<typeof Box>;

export const PageContainer: React.FC<Props> = ({ children, ...props }) => (
  <Flex
    bgSize="cover"
    w="100%"
    h="100vh"
    p={12}
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

export const MaxWidthContainer: React.FC<BoxProps> = ({
  children,
  ...props
}) => (
  <Box w="100%" maxW="1358px" mx="auto" px="2rem" {...props}>
    {children}
  </Box>
);
