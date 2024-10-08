import {
  Box,
  Flex,
  FlexProps,
  Image,
  StackProps,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
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
      (VanillaTilt as unknown as { init: (arg: HTMLElement) => void })
      .init(tilt.current);
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
        bgColor="#FFFFFF0A"
        backdropFilter="blur(7px)"
        borderTop="1px solid #2B2244"
        borderLeft="1px solid #2B2244"
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
      (VanillaTilt as unknown as { init: (arg: HTMLElement) => void })
      .init(tilt.current);
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
      mr={0}
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
        position={'relative'}
        borderRightRadius={25}
        maxW={'26rem'}
        borderLeftRadius={0}
      />
      <Flex
        direction="column"
        position="absolute"
        zIndex={2}
        bgColor="whiteAlpha.200"
        borderRightRadius={25}
        p={10}
        maxW={'26rem'} // (2 / 3.5) = ~0.571 aspect ratio desired
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

type MetaTilePathPlaybookProps = {
  image: string;
  index: number;
  length: number;
};

export const MetaTilePathPlaybook = React.forwardRef<
  HTMLDivElement,
  FlexProps & MetaTileProps & MetaTilePathPlaybookProps
>(
  (
    { noTilt = false, maxTilt = 6, children, image, index, length, ...props },
    fwdRef,
  ) => {
    const cardMaxWidth =
      useBreakpointValue({
        base: 36,
        md: 48,
        xl: '15rem',
        '2xl': '20rem',
      }) || '20rem';
    const cardMinHeight =
      useBreakpointValue({
        base: '13.5rem',
        md: '18rem',
        xl: '22.5rem',
        '2xl': '30rem',
      }) || '30rem';

    const tilt = useRef<Maybe<HTMLDivElement>>(null);
    useEffect(() => {
      if (!noTilt && tilt.current) {
        (VanillaTilt as unknown as { init: (arg: HTMLElement) => void })
        .init(tilt.current);
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
        minH={cardMinHeight}
        maxH={cardMinHeight}
        maxW={cardMaxWidth}
        mr={{ base: 2.5, xl: 4, '2xl': 6 }}
        borderRightRadius={{ base: 'lg', xl: '2xl' }}
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
          borderRightRadius={{ base: 'lg', xl: '2xl' }}
          maxW={cardMaxWidth}
          width="100%"
          borderLeftRadius={0}
          zIndex={0}
        />
        <Flex
          direction="column"
          position="absolute"
          zIndex={2}
          border={{
            base: '1px solid rgba(255, 255, 255, 0.12)',
            xl: '2px solid rgba(255, 255, 255, 0.12)',
          }}
          borderRightRadius={{ base: 'lg', xl: '2xl' }}
          p={{ base: 1, md: 2, xl: 6, '2xl': 10 }}
          maxW={cardMaxWidth}
          w="full"
          h="full"
          align="stretch"
          justify="space-between"
          gap="2px"
          {...props}
        >
          {children}
          <MetaTilePathCosmetics type="edges" />
        </Flex>
        <MetaTilePathCosmetics type="overlay" width={cardMaxWidth} />
      </Flex>
    );
  },
);

type MetaTilePathCosmeticOptions = 'edges' | 'overlay';
interface MetaTilePathCosmeticsProps {
  type: MetaTilePathCosmeticOptions;
  width?: string | number;
}

/**
 * `MetaTilePathCosmetics` - The cosmetic elements of the MetaTilePathPlaybook component when used in paths & playbooks
 * @param type 'edges | overlay' - The type of cosmetic to render
 * @param width string | number - Sets the width of the cosmetic overlay
 * @returns
 */
export const MetaTilePathCosmetics: React.FC<MetaTilePathCosmeticsProps> = ({
  type,
  width,
}) => {
  if (type === 'edges') {
    return (
      <Box
        display="flex"
        flexFlow="row nowrap"
        alignItems="center"
        justifyContent="flex-end"
        gap="2px"
        position={'absolute'}
        inset={0}
        left={'auto'}
        right={{ base: '-0.75rem', xl: '-1.625rem' }}
        width={{ base: 3, xl: 6 }}
        aria-hidden="true"
      >
        <Box
          role="presentation"
          width={{ base: 1, xl: 2.5 }}
          bgColor="#AE90C6"
          borderRightRadius={{ base: 'lg', xl: '2xl' }}
          height="91%"
        />
        <Box
          width={{ base: 1, xl: 2.5 }}
          bgColor="#936BB3"
          borderRightRadius={{ base: 'lg', xl: '2xl' }}
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
        maxW={width}
        background={
          'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0.34%, rgba(0, 0, 0, 0.00) 34.08%, rgba(13, 0, 19, 0.35) 59.18%, rgba(20, 0, 28, 0.3) 100%)'
        }
        borderRightRadius={{ base: 'lg', xl: '2xl' }}
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
