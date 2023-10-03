import {
  Box,
  Flex,
  FlexProps,
  Image,
  StackProps,
  VStack,
} from '@chakra-ui/react';
import { Maybe, Values } from '@metafam/utils';
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
  FlexProps & MetaTileProps & { image: string; isPath?: boolean }
>(
  (
    { noTilt = false, maxTilt = 6, children, image, isPath = false, ...props },
    fwdRef,
  ) => {
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
        minH="480px"
        mr={isPath ? 6 : 0}
        borderRightRadius={isPath ? 16 : 25}
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
          position={'relative'}
          borderRightRadius={isPath ? '2xl' : 25}
          maxW={isPath ? '21rem' : '26rem'}
          objectFit={isPath ? 'cover' : 'inherit'}
          borderLeftRadius={0}
          zIndex={isPath ? 0 : 'unset'}
        />
        <Flex
          direction="column"
          position="absolute"
          zIndex={2}
          bgColor="whiteAlpha.200"
          border={isPath ? '2px solid rgba(255, 255, 255, 0.12)' : 'none'}
          borderRightRadius={isPath ? '2xl' : 25}
          p={10}
          maxW={isPath ? '21rem' : '26rem'} // (2 / 3.5) = ~0.571 aspect ratio desired
          w="full"
          h="full"
          align="stretch"
          justify="space-between"
          {...props}
        >
          {children}
          {isPath ? <MetaPathCosmetics type="edges" /> : null}
        </Flex>
        {isPath ? <MetaPathCosmetics type="overlay" /> : null}
      </Flex>
    );
  },
);

type MetaPathCosmeticOptions = 'edges' | 'overlay';
interface MetaPathCosmeticsProps {
  type: MetaPathCosmeticOptions;
}

/**
 * `MetaPathCosmetics` - The cosmetic elements of the MetaTilePlaybook component when used in paths & playbooks
 * @param type 'edges | overlay' - The type of cosmetic to render
 * @returns
 */
export const MetaPathCosmetics: React.FC<MetaPathCosmeticsProps> = ({
  type,
}) => {
  if (type === 'edges') {
    return (
      <Box
        position={'absolute'}
        top={0}
        left={'auto'}
        right={-6}
        bottom={0}
        width={6}
        aria-hidden="true"
      >
        <Box
          role="presentation"
          position={'absolute'}
          top={'4.5%'}
          left={0.5}
          right={'auto'}
          bottom={0}
          width={2.5}
          bgColor="#AE90C6"
          borderRightRadius="2xl"
          height="91%"
        />
        <Box
          position={'absolute'}
          top={'8%'}
          left={'14px'}
          right={'auto'}
          bottom={0}
          width="10px"
          bgColor="#936BB3"
          borderRightRadius="2xl"
          height="84%"
        />
      </Box>
    );
  }

  if (type === 'overlay') {
    return (
      <Box
        position="absolute"
        inset={0}
        right="auto"
        width="full"
        maxW="21rem"
        background={
          'linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0.34%, rgba(0, 0, 0, 0.00) 34.08%, rgba(13, 0, 19, 0.35) 59.18%, rgba(20, 0, 28, 0.85) 100%)'
        }
        borderRightRadius="2xl"
        zIndex={1}
        aria-hidden="true"
      />
    );
  }
  return null;
};

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
