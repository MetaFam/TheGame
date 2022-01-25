import { Flex } from '@metafam/ds';
import BackgroundImage from 'assets/main-background.jpg';
import React from 'react';

type Props = React.ComponentProps<typeof Flex>;

export const PageContainer: React.FC<Props> = ({ children, ...props }) => (
  <Flex
    bgSize="cover"
    bgAttachment="fixed"
    w="full"
    minH="100vh"
    px={[4, 8, 12]}
    pt={[4, 8, 12]}
    pb={[20, 20, 20, 12]}
    direction="column"
    align="center"
    backgroundImage={`url(${BackgroundImage})`}
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
