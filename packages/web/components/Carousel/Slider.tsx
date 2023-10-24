import {
  Box,
  Button,
  ChevronRight,
  HStack,
  IconButton,
  useBreakpointValue,
  VStack,
} from '@metafam/ds';
import { useBoundingRect } from 'lib/hooks/useBoundingRect';
import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';

import { useCarouselContext } from './CarouselContext';

export const Slider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    setTrackIsActive,
    setSliderWidth,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    gap,
    hidePositions,
    itemsToShow,
    defaultCarousel,
  } = useCarouselContext();

  const [ref, { width }] = useBoundingRect();
  const itemsCount = positions.length;
  // const isMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(
    () => setSliderWidth(Math.round(width ?? 0)),
    [width, setSliderWidth],
  );

  const handleFocus = () => setTrackIsActive(true);

  return (
    <VStack align="flex-start" w="100%" spacing={4} overflowX="visible">
      <Box
        ref={ref}
        w={
          defaultCarousel
            ? { base: '100%', md: `calc(100% + ${gap}px)` }
            : `calc(100% + ${gap / 2}px + 1rem)`
        }
        ml={defaultCarousel ? `-${gap / 2}px` : { base: 0, lg: -4 }}
        px={defaultCarousel ? `${gap / 2}px` : { base: 0, lg: 4 }}
        py={{ base: 0, lg: '1rem' }}
        position="relative"
        overflow="visible"
        overflowX={defaultCarousel ? 'visible' : 'hidden'}
        _before={{
          bgGradient: 'linear(to-r, base.d400, transparent)',
          position: 'absolute',
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: '100%',
          left: 0,
          top: 0,
        }}
        _after={{
          bgGradient: 'linear(to-l, base.d400, transparent)',
          position: 'absolute',
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: '100%',
          right: 0,
          top: 0,
        }}
      >
        {children}
      </Box>
      {!defaultCarousel && positions.length > constraint && (
        <HStack
          display={{ base: 'flex', xl: 'flex' }}
          position="absolute"
          top="auto"
          bottom="25%"
          h="50%"
          w={{ base: '100%', lg: `calc(100% + ${45}px)`, '2xl': '100%' }}
          left={{ base: '0', lg: '-25px', '2xl': 0 }}
          justify="space-between"
          align="center"
          spacing={2}
          pointerEvents="none"
        >
          <IconButton
            icon={<ChevronRight />}
            aria-label="Previous"
            fontSize={{ base: '7xl', xl: '9xl' }}
            onClick={() => {
              setTrackIsActive(true);
              setActiveItem(activeItem - 1);
            }}
            onFocus={handleFocus}
            color="gray.200"
            variant="link"
            minW={0}
            maxW={{ base: 5, lg: 'inherit' }}
            isDisabled={activeItem === 0}
            opacity={activeItem === 0 ? '0!important' : 1}
            cursor={activeItem === 0 ? 'default!important' : 'pointer'}
            pointerEvents="all"
            transform="scaleX(-1)"
            transition="opacity 0.2s ease-in-out"
          />

          <IconButton
            icon={<ChevronRight />}
            aria-label="Next"
            fontSize={{ base: '7xl', xl: '9xl' }}
            onClick={() => {
              setTrackIsActive(true);
              setActiveItem(activeItem + 1);
            }}
            onFocus={handleFocus}
            color="gray.200"
            variant="link"
            minW={0}
            maxW={{ base: 5, lg: 'inherit' }}
            isDisabled={activeItem + itemsToShow >= itemsCount}
            cursor={
              activeItem + itemsToShow >= itemsCount
                ? 'default!important'
                : 'pointer'
            }
            opacity={activeItem + itemsToShow >= itemsCount ? '0!important' : 1}
            pointerEvents="all"
            transition="opacity 0.2s ease-in-out"
          />
        </HStack>
      )}

      {!hidePositions && defaultCarousel && positions.length > constraint && (
        <HStack
          w={`${itemWidth}px`}
          justify="center"
          align="center"
          spacing={2}
        >
          {positions.map((_, index) => {
            if (!defaultCarousel && index <= itemsCount / 3) {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    setTrackIsActive(true);
                    setActiveItem(index);
                  }}
                  onFocus={handleFocus}
                  color="gray.200"
                  variant="link"
                  minW={0}
                >
                  {index === activeItem ? (
                    <Box bg="#DBD1DB" borderRadius="50%" h={4} w={4} />
                  ) : (
                    <Box
                      border="1px solid"
                      borderColor="#DBD1DB"
                      borderRadius="50%"
                      h={4}
                      w={4}
                    />
                  )}
                </Button>
              );
            }
            return (
              <Button
                key={index}
                onClick={() => {
                  setTrackIsActive(true);
                  setActiveItem(index);
                }}
                onFocus={handleFocus}
                color="gray.200"
                variant="link"
                minW={0}
              >
                {index === activeItem ? (
                  <Box bg="#DBD1DB" borderRadius="50%" h={4} w={4} />
                ) : (
                  <Box
                    border="1px solid"
                    borderColor="#DBD1DB"
                    borderRadius="50%"
                    h={4}
                    w={4}
                  />
                )}
              </Button>
            );
          })}
        </HStack>
      )}

      {/* {hidePositions && !defaultCarousel && isMobile && positions.length > constraint && (
        <HStack
          w={`${width}px`}
          justify="center"
          align="center"
          spacing={2}
        >
          {positions.map((_, index) => {
            if (!defaultCarousel && index <= itemsCount / 3) {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    setTrackIsActive(true);
                    setActiveItem(index);
                  }}
                  onFocus={handleFocus}
                  color="gray.200"
                  variant="link"
                  minW={0}
                >
                  {index === activeItem ? (
                    <Box bg="#DBD1DB" borderRadius="50%" h={4} w={4} />
                  ) : (
                    <Box
                      border="1px solid"
                      borderColor="#DBD1DB"
                      borderRadius="50%"
                      h={4}
                      w={4}
                    />
                  )}
                </Button>
              );
            }
            return (
              <Button
                key={index}
                onClick={() => {
                  setTrackIsActive(true);
                  setActiveItem(index);
                }}
                onFocus={handleFocus}
                color="gray.200"
                variant="link"
                minW={0}
              >
                {index === activeItem ? (
                  <Box bg="#DBD1DB" borderRadius="50%" h={4} w={4} />
                ) : (
                  <Box
                    border="1px solid"
                    borderColor="#DBD1DB"
                    borderRadius="50%"
                    h={4}
                    w={4}
                  />
                )}
              </Button>
            );
          })}
        </HStack>
      )} */}
    </VStack>
  );
};
