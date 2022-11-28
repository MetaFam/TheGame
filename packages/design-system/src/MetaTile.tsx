import { Flex, FlexProps, StackProps, VStack } from '@chakra-ui/react';
import { Maybe } from '@metafam/utils';
import React, { ReactNode, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

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
    position="relative"
    height="full"
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

type MetaTileProps = {
  noTilt?: boolean;
  maxTilt?: number;
};

export const MetaTile: React.FC<FlexProps & MetaTileProps> = ({
  noTilt = false,
  maxTilt = 6,
  children,
  ...props
}) => {
  const tilt = useRef<Maybe<HTMLDivElement>>(null);

  useEffect(() => {
    if (!noTilt && tilt.current) {
      VanillaTilt.init(tilt.current);
    }
  }, [noTilt]);

  return (
    <Flex
      data-tilt-scale={1.03}
      data-tilt-max={maxTilt}
      data-tilt-speed={800}
      data-tilt-easing="cubic-bezier(.03,.98,.52,.99)"
      h="full"
      w="full"
      borderRadius="8px"
      ref={tilt}
    >
      <Flex
        direction="column"
        bgColor="whiteAlpha.200"
        backdropFilter="blur(7px)"
        rounded="lg"
        p={6}
        maxW="26rem" // (2 / 3.5) = ~0.571 aspect ratio desired
        w="full"
        h="full"
        align="stretch"
        position="relative"
        justify="space-between"
        {...props}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export const MetaTileLinkWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Flex
    align="center"
    justifyContent="center"
    bgColor="rgba(255, 255, 255, 0.06)"
    minW={8}
    h={8}
    borderRadius={8}
  >
    {children}
  </Flex>
);
