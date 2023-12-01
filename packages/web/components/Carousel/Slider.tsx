import { Box, Button, HStack, VStack } from '@metafam/ds';
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
  } = useCarouselContext();

  const [ref, { width }] = useBoundingRect();

  useEffect(
    () => setSliderWidth(Math.round(width ?? 0)),
    [width, setSliderWidth],
  );

  const handleFocus = () => setTrackIsActive(true);

  return (
    <VStack align="flex-start" w="100%" spacing={4}>
      <Box
        ref={ref}
        w={{ base: '100%', md: `calc(100% + ${gap}px)` }}
        ml={{ base: 0, md: `-${gap / 2}px` }}
        px={`${gap / 2}px`}
        position="relative"
        overflow="visible"
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

      {positions.length > constraint && (
        <HStack
          w={`${itemWidth}px`}
          justify="center"
          align="center"
          spacing={2}
        >
          {positions.map((_, index) => (
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
          ))}
        </HStack>
      )}
    </VStack>
  );
};
