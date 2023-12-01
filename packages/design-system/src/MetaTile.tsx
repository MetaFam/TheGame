import { Flex, FlexProps, Image, StackProps, VStack } from '@chakra-ui/react';
import { Maybe } from '@metafam/utils';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

export const MetaTileHeader: React.FC<StackProps> = ({
  children,
  ...props
}) => (
  <VStack
    w="full"
    spacing={6}
    align="stretch"
    position="relative"
    borderTopRadius={10}
    bgColor="whiteAlpha.50"
    {...props}
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
    bgColor="whiteAlpha.100"
    backdropFilter="blur(10px)"
    {...props}
  >
    {children}
  </VStack>
);

type MetaTileProps = {
  noTilt?: boolean;
  maxTilt?: number;
};

export const MetaTile = React.forwardRef<
  HTMLDivElement,
  FlexProps & MetaTileProps
>(({ noTilt = false, maxTilt = 6, children, ...props }, fwdRef) => {
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
      ref={(elem) => {
        tilt.current = elem;
        if (typeof fwdRef === 'function') {
          fwdRef(elem);
        } else if (fwdRef) {
          // eslint-disable-next-line no-param-reassign
          fwdRef.current = elem;
        }
      }}
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
});

export const MetaTilePlaybook = React.forwardRef<
  HTMLDivElement,
  FlexProps & MetaTileProps & { image: string }
>(({ noTilt = false, maxTilt = 6, children, image, ...props }, fwdRef) => {
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
      borderRightRadius={25}
      ref={(elem) => {
        tilt.current = elem;
        if (typeof fwdRef === 'function') {
          fwdRef(elem);
        } else if (fwdRef) {
          // eslint-disable-next-line no-param-reassign
          fwdRef.current = elem;
        }
      }}
    >
      <Image
        src={image}
        borderRightRadius={25}
        maxW="26rem"
        borderLeftRadius={0}
      />
      <Flex
        direction="column"
        position="absolute"
        zIndex={1}
        bgColor="whiteAlpha.200"
        borderRightRadius={25}
        p={10}
        maxW="26rem" // (2 / 3.5) = ~0.571 aspect ratio desired
        w="full"
        h="full"
        align="stretch"
        justify="space-between"
        {...props}
      >
        {children}
      </Flex>
    </Flex>
  );
});

export const MetaTileLinkWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <Flex
    align="center"
    justifyContent="center"
    bgColor="whiteAlpha.100"
    minW={8}
    h={8}
    borderRadius={8}
  >
    {children}
  </Flex>
);
