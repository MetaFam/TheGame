import type { PanInfo } from '@metafam/ds';
import {
  Box,
  Flex,
  motion,
  useAnimation,
  useBreakpointValue,
  useMotionValue,
  VStack,
} from '@metafam/ds';
import type { PropsWithChildren } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useCarouselContext } from './CarouselContext';

const MotionBox = motion(Box);

const transitionProps = {
  stiffness: 400,
  type: 'spring',
  damping: 60,
  mass: 3,
};

export const Track: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    setDragging,
    setTrackIsActive,
    trackIsActive,
    isSubmittingProof,
    setActiveItem,
    activeItem,
    constraint,
    multiplier,
    itemWidth,
    positions,
  } = useCarouselContext();

  const [dragStartPosition, setDragStartPosition] = useState(0);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const node = useRef<HTMLDivElement>(null);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const handleDragStart = () => {
    setDragging(true);
    setDragStartPosition(positions[activeItem]);
  };

  // 2022-10-25: This method relied on on a type imported from
  // Framer that no longer exists.
  const handleDragEnd = (_evt: DragEvent, info: PanInfo) => {
    const distance = info.offset.x;
    const velocity = info.velocity.x * multiplier;
    const direction = velocity < 0 || distance < 0 ? 1 : -1;

    const extrapolatedPosition =
      dragStartPosition +
      (direction === 1
        ? Math.min(velocity, distance)
        : Math.max(velocity, distance));

    const closestPosition = positions.reduce(
      (prev: number, curr: number) =>
        Math.abs(curr - extrapolatedPosition) <
        Math.abs(prev - extrapolatedPosition)
          ? curr
          : prev,
      0,
    );

    if (!(closestPosition < positions[positions.length - constraint])) {
      setActiveItem(positions.indexOf(closestPosition));
      controls.start({
        x: closestPosition,
        transition: {
          velocity: info.velocity.x,
          ...transitionProps,
        },
      });
    } else {
      setActiveItem(positions.length - constraint);
      controls.start({
        x: positions[positions.length - constraint],
        transition: {
          velocity: info.velocity.x,
          ...transitionProps,
        },
      });
    }
    setDragging(false);
  };

  const handleResize = useCallback(
    () =>
      controls.start({
        x: positions[activeItem],
        transition: {
          ...transitionProps,
        },
      }),
    [activeItem, controls, positions],
  );

  const handleClick = useCallback(
    (event: MouseEvent) =>
      node?.current?.contains(event.target as Node)
        ? setTrackIsActive(true)
        : setTrackIsActive(false),
    [setTrackIsActive],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (trackIsActive && !isSubmittingProof) {
        if (activeItem < positions.length - constraint) {
          if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveItem((prev: number) => prev + 1);
          }
        }
        if (activeItem > positions.length - positions.length) {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveItem((prev: number) => prev - 1);
          }
        }
      }
    },
    [
      trackIsActive,
      isSubmittingProof,
      activeItem,
      positions.length,
      constraint,
      setActiveItem,
    ],
  );

  useEffect(() => {
    handleResize();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick, handleResize, handleKeyDown, positions]);

  return (
    <>
      {itemWidth && (
        <VStack ref={node} spacing={5} alignItems="stretch">
          <MotionBox
            as={Flex}
            dragConstraints={node}
            onDragStart={isMobile ? undefined : handleDragStart}
            onDragEnd={isMobile ? undefined : handleDragEnd}
            animate={controls}
            style={{ x }}
            drag="x"
            _active={{ cursor: 'grabbing' }}
            minWidth="min-content"
            flexWrap="nowrap"
            cursor="grab"
          >
            {children}
          </MotionBox>
        </VStack>
      )}
    </>
  );
};
